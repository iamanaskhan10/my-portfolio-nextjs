import {
  Color, Mesh, PerspectiveCamera, PlaneGeometry, Scene,
  ShaderMaterial, WebGLRenderer,
} from "three";

// This decorative surface is transparent through the opening. The content
// behind it is always the real DOM hero, never a screenshot or canvas texture.
export function createPortalRenderer(canvas, palette) {
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
  if (!context) return null;

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.001, 100);
  const geometry = new PlaneGeometry(200, 200);
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      ink: { value: new Color(palette.ink) },
      signal: { value: new Color(palette.signal) },
      highlight: { value: new Color(palette.highlight) },
      light: { value: 0 },
    },
    vertexShader: `
      varying vec2 surface;
      void main() {
        surface = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 ink;
      uniform vec3 signal;
      uniform vec3 highlight;
      uniform float light;
      varying vec2 surface;
      void main() {
        // Four concave sides meet at sharp tips. This is the same quadratic
        // aperture as the SVG fallback, in camera-space world units.
        vec2 p = abs(surface) / 0.1;
        float field = sqrt(p.x) + sqrt(p.y) - 1.0;
        float aa = max(fwidth(field), 0.001);
        float cover = smoothstep(-aa, aa, field);
        vec2 illumination = surface;
        float diffuse = exp(-dot(illumination, illumination) * 1.25);
        float core = exp(-dot(illumination, illumination) * 3.8);
        float edge = exp(-abs(field) * 45.0);
        vec3 color = mix(ink, signal, diffuse * light * 0.68);
        color = mix(color, highlight, core * light * 0.2);
        color += signal * edge * light * 0.08;
        gl_FragColor = vec4(color, cover);
        #include <colorspace_fragment>
      }
    `,
  });
  const surface = new Mesh(geometry, material);
  scene.add(surface);

  return {
    resize(width, height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    render({ cameraZ, rotation, light }) {
      camera.position.z = cameraZ;
      surface.rotation.z = rotation * Math.PI / 180;
      material.uniforms.light.value = light;
      renderer.render(scene, camera);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

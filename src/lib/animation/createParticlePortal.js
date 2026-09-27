// Scroll-rendered spherical particles. Canvas 2D avoids shader compilation and
// keeps this brief transition independent of the opening and 3D DOM surfaces.
export function createParticlePortal(canvas, { signal, highlight, compact }) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return null;
  const count = compact ? 520 : 1200;
  const points = Array.from({ length: count }, (_, index) => {
    const y = 1 - (index + 0.5) * 2 / count;
    const angle = index * 2.399963;
    const radius = Math.sqrt(1 - y * y);
    const ripple = 1 + Math.sin(angle * 6) * 0.035 + Math.cos(y * 17) * 0.045;
    return { x: Math.cos(angle) * radius * ripple, y: y * ripple, z: Math.sin(angle) * radius * ripple, bright: index % 5 === 0 };
  });
  let width = 0, height = 0;
  return {
    resize(nextWidth, nextHeight) {
      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    render(progress) {
      context.clearRect(0, 0, width, height);
      const fade = Math.min(1, (1 - progress) / 0.16);
      if (fade <= 0) return;
      const radius = Math.min(width, height) * 0.33;
      const zoom = 0.7 + 0.8 * progress + 5 * progress ** 5;
      const angle = progress * 0.8, cosine = Math.cos(angle), sine = Math.sin(angle);
      for (const point of points) {
        const x = point.x * cosine + point.z * sine;
        const z = point.z * cosine - point.x * sine;
        const perspective = 3 / (3 - z);
        const px = width / 2 + x * radius * zoom * perspective;
        const py = height * 0.48 + point.y * radius * zoom * perspective;
        if (px < -3 || px > width + 3 || py < -3 || py > height + 3) continue;
        const size = (point.bright ? 1.5 : 0.85) * Math.min(zoom, 2) * perspective;
        context.globalAlpha = fade * (0.15 + 0.72 * (1 - Math.min(1, Math.abs(z))));
        context.fillStyle = point.bright ? highlight : signal;
        context.fillRect(px, py, size, size);
      }
      context.globalAlpha = 1;
    },
    dispose() { canvas.width = 0; canvas.height = 0; },
  };
}

// Scroll-rendered star emission and the original spherical glitter cloud.
// Canvas 2D keeps the effect bounded to this transition, with no idle loop.
export function createParticlePortal(canvas, { signal, highlight, ink, compact }) {
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
      if (progress <= 0) return;
      const cx = width / 2, cy = height / 2 + 10;
      // Keep the approved black star's silhouette and expansion unchanged.
      const cover = (Math.sqrt(width / 2) + Math.sqrt(height / 2 + 10)) ** 2 * 1.08;
      const growth = Math.min(1, progress / 0.58);
      const radius = 17 * (cover / 17) ** (growth ** 1.2);
      context.beginPath();
      context.moveTo(cx, cy - radius);
      context.quadraticCurveTo(cx, cy, cx + radius, cy);
      context.quadraticCurveTo(cx, cy, cx, cy + radius);
      context.quadraticCurveTo(cx, cy, cx - radius, cy);
      context.quadraticCurveTo(cx, cy, cx, cy - radius);
      context.closePath();
      context.fillStyle = ink;
      context.fill();
      context.strokeStyle = signal;
      context.globalAlpha = 0.16;
      context.lineWidth = 1.5;
      context.stroke();
      // The earlier Fibonacci particle cloud spreads inside the panel first.
      // After the portal covers the screen, its depth accelerates toward us.
      const fade = Math.min(1, progress / 0.12) * Math.min(1, (1 - progress) / 0.16);
      const cloudRadius = Math.min(height * 0.4, width * 0.62, 420) * 0.46;
      const departure = Math.max(0, (progress - 0.56) / 0.44);
      const zoom = 0.35 + 0.85 * Math.min(1, progress / 0.56) + 7 * departure ** 2.2;
      const angle = progress * 0.8, cosine = Math.cos(angle), sine = Math.sin(angle);
      for (const point of points) {
        const x = point.x * cosine + point.z * sine;
        const z = point.z * cosine - point.x * sine;
        const perspective = 3 / (3 - z);
        const px = cx + x * cloudRadius * zoom * perspective;
        const py = cy + point.y * cloudRadius * zoom * perspective;
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

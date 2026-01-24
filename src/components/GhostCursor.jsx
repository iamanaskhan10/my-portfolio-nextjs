"use client";
import { useEffect, useRef, useMemo } from "react";
import styles from "./GhostCursor.module.css";

const GhostCursor = ({
  className,
  style,
  color = "#ec4899",
  trailLength = 35,
  fadeSpeed = 0.94,
  mixBlendMode = "screen",
  zIndex = 9999,
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const trailRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevRef = useRef({ x: -100, y: -100 });
  const activeRef = useRef(false);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.pointerEvents = "none";
    if (mixBlendMode) canvas.style.mixBlendMode = mixBlendMode;
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // Parse color
    const tempEl = document.createElement("div");
    tempEl.style.color = color;
    document.body.appendChild(tempEl);
    const computed = getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    const rgbMatch = computed.match(/(\d+),\s*(\d+),\s*(\d+)/);
    const r = rgbMatch ? parseInt(rgbMatch[1]) : 236;
    const g = rgbMatch ? parseInt(rgbMatch[2]) : 72;
    const b = rgbMatch ? parseInt(rgbMatch[3]) : 153;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas.width) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;
      const particles = particlesRef.current;

      // Speed
      const dx = mouseRef.current.x - prevRef.current.x;
      const dy = mouseRef.current.y - prevRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const clampedSpeed = Math.min(speed, 100);
      prevRef.current.x += (mouseRef.current.x - prevRef.current.x) * 0.4;
      prevRef.current.y += (mouseRef.current.y - prevRef.current.y) * 0.4;

      // Fade trail
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].alpha *= fadeSpeed;
        if (trail[i].alpha < 0.003) trail.splice(i, 1);
      }

      // Fade particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015;
        p.alpha *= 0.93;
        p.size *= 0.96;
        if (p.alpha < 0.01) particles.splice(i, 1);
      }

      // Emit particles on movement (fewer, smaller)
      if (activeRef.current && clampedSpeed > 6) {
        const count = Math.min(Math.floor(clampedSpeed / 15), 2);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 0.3 + Math.random() * 1.2;
          particles.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 6,
            y: mouseRef.current.y + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            alpha: 0.4 + Math.random() * 0.3,
            size: 1 + Math.random() * 1.5,
          });
        }
      }

      // === Draw ambient glow behind trail ===
      if (trail.length > 3) {
        const mid = trail[Math.floor(trail.length / 2)];
        if (mid) {
          const ambientSize = 30 + clampedSpeed * 0.4;
          const ambGrad = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, ambientSize);
          ambGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.06)`);
          ambGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.beginPath();
          ctx.arc(mid.x, mid.y, ambientSize, 0, Math.PI * 2);
          ctx.fillStyle = ambGrad;
          ctx.fill();
        }
      }

      // === Draw smooth trail path with glow ===
      if (trail.length > 2) {
        // Outer glow stroke
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
        ctx.lineWidth = 2.5 + clampedSpeed * 0.03;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
        ctx.shadowBlur = 8;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner bright stroke
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, 0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // === Draw glow orbs ===
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const progress = i / trail.length;
        const pulse = 1 + Math.sin(t * 4 + i * 0.3) * 0.15;
        const baseSize = (5 + pt.speed * 0.25) * pulse;
        const size = baseSize * pt.alpha * (0.4 + progress * 0.6);
        if (size < 0.3) continue;

        // Outer bloom
        const outerSize = size * 2;
        const outerGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, outerSize);
        outerGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${pt.alpha * 0.2})`);
        outerGrad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${pt.alpha * 0.08})`);
        outerGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, outerSize, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Inner core
        const innerGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, size);
        innerGrad.addColorStop(0, `rgba(255, 255, 255, ${pt.alpha * 0.3})`);
        innerGrad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, ${pt.alpha * 0.4})`);
        innerGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = innerGrad;
        ctx.fill();
      }

      // === Draw particles (sparkles) ===
      for (const p of particles) {
        const sparkGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        sparkGrad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.6})`);
        sparkGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.3})`);
        sparkGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = sparkGrad;
        ctx.fill();
      }

      // === Head glow (hotspot) ===
      if (activeRef.current && trail.length > 0) {
        const head = trail[trail.length - 1];
        if (head) {
          const pulse = 1 + Math.sin(t * 6) * 0.1;
          const headSize = (8 + clampedSpeed * 0.3) * pulse;

          // Outer aura
          const auraSize = headSize * 1.8;
          const auraGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, auraSize);
          auraGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
          auraGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.08)`);
          auraGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.beginPath();
          ctx.arc(head.x, head.y, auraSize, 0, Math.PI * 2);
          ctx.fillStyle = auraGrad;
          ctx.fill();

          // Bright core
          const headGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, headSize);
          headGrad.addColorStop(0, `rgba(255, 255, 255, 0.55)`);
          headGrad.addColorStop(0.15, `rgba(255, 220, 240, 0.4)`);
          headGrad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.2)`);
          headGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.beginPath();
          ctx.arc(head.x, head.y, headSize, 0, Math.PI * 2);
          ctx.fillStyle = headGrad;
          ctx.fill();
        }
      }

      // Add trail point
      if (activeRef.current) {
        const x = mouseRef.current.x;
        const y = mouseRef.current.y;
        if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
          trail.push({ x, y, alpha: 1, speed: clampedSpeed });
          if (trail.length > trailLength) trail.shift();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      activeRef.current = true;
    };
    const onLeave = () => {
      activeRef.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
    };
  }, [color, trailLength, fadeSpeed, mixBlendMode]);

  const mergedStyle = useMemo(() => ({ zIndex, ...style }), [zIndex, style]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className ?? ""}`}
      style={mergedStyle}
    />
  );
};

export default GhostCursor;

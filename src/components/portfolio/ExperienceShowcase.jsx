"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ExperienceShowcase.module.css";
import ScrollReveal from "./ScrollReveal";

export default function ExperienceShowcase() {
  const { experiences, profile, site } = usePortfolioContent();
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const [current, setCurrent] = useState(0);
  const reducedMotion = useMotionPreference();

  useEffect(() => {
    const hideCursor = () => { if (sectionRef.current) sectionRef.current.dataset.cursor = "false"; };
    window.addEventListener("blur", hideCursor);
    window.addEventListener("scroll", hideCursor, { passive: true });
    return () => { window.removeEventListener("blur", hideCursor); window.removeEventListener("scroll", hideCursor); };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const inset = parseFloat(getComputedStyle(track).paddingLeft);
      track.parentElement.dataset.scrolled = String(track.scrollLeft > 2);
      const distances = [...track.children].map((item) => Math.abs(track.scrollLeft - Math.min(item.offsetLeft - inset, max)));
      setCurrent(distances.indexOf(Math.min(...distances)));
    };
    track.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(track);
    update();
    return () => { track.removeEventListener("scroll", update); resize.disconnect(); };
  }, []);

  const goTo = (index) => {
    const track = trackRef.current;
    const target = Math.max(0, Math.min(experiences.length - 1, index));
    const inset = parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({ left: track.children[target].offsetLeft - inset, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} id="experience" className={styles.section} aria-labelledby="experience-heading"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        event.currentTarget.style.setProperty("--cursor-x", `${event.clientX}px`);
        event.currentTarget.style.setProperty("--cursor-y", `${event.clientY}px`);
        event.currentTarget.dataset.cursor = "true";
      }} onPointerLeave={(event) => { event.currentTarget.dataset.cursor = "false"; }}>
      <div className={styles.atmosphere} aria-hidden="true">
        {experiences.map((experience, index) => <div key={experience.id} className={styles[`tone${index % 3}`]} style={{ opacity: current === index ? 1 : 0 }} />)}
      </div>
      <span className={styles.cursor} aria-hidden="true" />
      <ScrollReveal className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="experience-heading"><span>{site.experience.heading}</span><span>{site.experience.accent}</span></h2>
          <a className={styles.archive} href={profile.resume} target="_blank" rel="noopener noreferrer">{site.experience.resumeLabel} <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className={styles.gallery}>
          <div className={styles.trackWindow}>
          <div ref={trackRef} id="experience-showcase" className={styles.track} tabIndex={0}
            role="region" aria-label="Work experience. Scroll horizontally or use the arrow keys."
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse" || event.button !== 0) return;
              suppressClick.current = false;
              drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
            }}
            onPointerMove={(event) => {
              if (!drag.current || event.buttons !== 1) return;
              const distance = event.clientX - drag.current.x;
              if (Math.abs(distance) < 6 && !drag.current.moved) return;
              drag.current.moved = true;
              suppressClick.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.dataset.dragging = "true";
              event.currentTarget.scrollLeft = drag.current.left - distance;
            }}
            onPointerUp={(event) => {
              if (!drag.current) return;
              drag.current = null;
              delete event.currentTarget.dataset.dragging;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={(event) => { drag.current = null; delete event.currentTarget.dataset.dragging; }}
            onDragStart={(event) => event.preventDefault()}
            onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;
              if (event.key === "ArrowRight") { event.preventDefault(); goTo(current + 1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); goTo(current - 1); }
              if (event.key === "Home") { event.preventDefault(); goTo(0); }
              if (event.key === "End") { event.preventDefault(); goTo(experiences.length - 1); }
            }}>
            {experiences.map((experience) => (
              <article key={experience.id} className={styles.entry} aria-label={`${experience.role} at ${experience.company}`}>
                <div className={styles.meta}><span>{experience.company}</span><span>{experience.duration}</span></div>
                <h3>{experience.role}</h3>
                <p className={styles.description}>{experience.outcome}</p>
              </article>
            ))}
          </div>
          <span className={styles.edgeBlur} aria-hidden="true" />
          </div>
          <div className={styles.controls}>
            <div className={styles.progress} role="progressbar" aria-label="Experience position" aria-valuemin={1} aria-valuemax={experiences.length} aria-valuenow={current + 1}>
              <span style={{ transform: `scaleX(${(current + 1) / experiences.length})` }} />
            </div>
            <div className={styles.arrows}>
              <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous experience" aria-controls="experience-showcase"><ArrowLeft size={19} aria-hidden="true" /></button>
              <button type="button" onClick={() => goTo(current + 1)} disabled={current === experiences.length - 1} aria-label="Next experience" aria-controls="experience-showcase"><ArrowRight size={19} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

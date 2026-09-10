"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "../../data/caseStudies";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ProjectShowcase.module.css";

export default function ProjectShowcase() {
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
    const target = Math.max(0, Math.min(caseStudies.length - 1, index));
    const inset = parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({ left: track.children[target].offsetLeft - inset, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} id="projects" className={styles.section} aria-labelledby="work-heading"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        event.currentTarget.style.setProperty("--cursor-x", `${event.clientX}px`);
        event.currentTarget.style.setProperty("--cursor-y", `${event.clientY}px`);
        event.currentTarget.dataset.cursor = "true";
      }} onPointerLeave={(event) => { event.currentTarget.dataset.cursor = "false"; }}>
      <div className={styles.atmosphere} aria-hidden="true">
        {caseStudies.map((project, index) => <div key={project.slug} className={styles[`tone${index}`]} style={{ opacity: current === index ? 1 : 0 }} />)}
      </div>
      <span className={styles.cursor} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="work-heading">Projects</h2>
          <Link className={styles.archive} href="/projects">All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className={styles.gallery}>
          <div className={styles.trackWindow}>
          <div ref={trackRef} id="project-showcase" className={styles.track} tabIndex={0}
            role="region" aria-label="Project showcase. Scroll horizontally or use the arrow keys."
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
              if (event.key === "End") { event.preventDefault(); goTo(caseStudies.length - 1); }
            }}>
            {caseStudies.map((project) => (
              <article key={project.slug} className={styles.project} aria-label={project.title}>
                <div className={styles.meta}><span>{project.number} / {project.group}</span><span>{project.period}</span></div>
                <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                <div className={styles.projectAction}>
                  <Link className={styles.caseLink} href={`/projects/${project.slug}`}>View project <ArrowUpRight size={14} aria-hidden="true" /></Link>
                  <span className={styles.projectPreview} data-kind={project.cover.kind} aria-hidden="true">
                    <Image src={project.cover.src} alt="" width={project.gallery[0].width} height={project.gallery[0].height} sizes="20rem" />
                    <small>{project.cover.kind === "brand" ? "Project identity" : "Project illustration"}</small>
                  </span>
                </div>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.tags} aria-label="Technologies">
                  {project.stack.split(" · ").map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <span className={styles.edgeBlur} aria-hidden="true" />
          </div>
          <div className={styles.controls}>
            <div className={styles.progress} role="progressbar" aria-label="Project position" aria-valuemin={1} aria-valuemax={caseStudies.length} aria-valuenow={current + 1}>
              <span style={{ transform: `scaleX(${(current + 1) / caseStudies.length})` }} />
            </div>
            <span className={styles.count}>{String(current + 1).padStart(2, "0")} <span>/ {String(caseStudies.length).padStart(2, "0")}</span></span>
            <div className={styles.arrows}>
              <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous project" aria-controls="project-showcase"><ArrowLeft size={19} aria-hidden="true" /></button>
              <button type="button" onClick={() => goTo(current + 1)} disabled={current === caseStudies.length - 1} aria-label="Next project" aria-controls="project-showcase"><ArrowRight size={19} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

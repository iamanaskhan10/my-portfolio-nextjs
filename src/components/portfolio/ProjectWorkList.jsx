"use client";


import PortfolioButton from "./PortfolioButton";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ProjectWorkList.module.css";

function WorkCover({ project, floating = false }) {
  const [failed, setFailed] = useState(false);
  // A still poster keeps browsing quiet; the complete image gallery lives in the case page.
  const cover = project.cover?.src ? project.cover : project.gallery?.[0];
  const src = /\.gif(?:\?|$)/i.test(cover?.src || "")
    ? project.showcase?.posterSrc || project.gallery?.find((image) => !/\.gif(?:\?|$)/i.test(image.src))?.src
    : cover?.src;
  return <div className={styles.cover} data-work-cover>
    {src && !failed ? <Image src={src} alt={floating ? "" : cover?.alt || `${project.title} preview`} fill sizes={floating ? "60vw" : "(max-width: 600px) 180vw, 90vw"} onError={() => setFailed(true)} /> : <span className={styles.unavailable}>{project.title}<small>Preview coming soon</small></span>}
  </div>;
}

export default function ProjectWorkList({ projects, archiveLabel }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const workRef = useRef(null);
  const pointerRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const x = useMotionValue(0), y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 240, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 240, damping: 28 });
  const cursorX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.8 });
  const cursorY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.8 });
  const velocityX = useVelocity(cursorX), velocityY = useVelocity(cursorY);
  const stretch = useTransform([velocityX, velocityY], ([vx, vy]) => Math.max(-0.045, Math.min(0.045, (Math.abs(vx) - Math.abs(vy)) / 15000)));
  const stretchX = useTransform(stretch, (value) => 1 + value);
  const stretchY = useTransform(stretch, (value) => 1 - value);
  const scaleX = useSpring(stretchX, { stiffness: 260, damping: 30 });
  const scaleY = useSpring(stretchY, { stiffness: 260, damping: 30 });
  const textDriftX = useTransform(velocityX, (value) => Math.max(-3, Math.min(3, -value / 350)));
  const textDriftY = useTransform(velocityY, (value) => Math.max(-3, Math.min(3, -value / 350)));
  const textX = useSpring(textDriftX, { stiffness: 220, damping: 25 });
  const textY = useSpring(textDriftY, { stiffness: 220, damping: 25 });

  useEffect(() => {
    setMounted(true);
    let frame = 0;
    const hide = () => { pointerRef.current = null; setVisible(false); };
    const refreshHover = () => {
      frame = 0;
      const pointer = pointerRef.current;
      if (!pointer) return;
      const row = document.elementFromPoint(pointer.x, pointer.y)?.closest("[data-work-row]");
      if (row && workRef.current?.contains(row)) {
        const half = Math.min(window.innerWidth - 32, Math.max(240, window.innerWidth * 0.275)) / 2;
        x.set(Math.max(half + 16, Math.min(window.innerWidth - half - 16, pointer.x)));
        y.set(Math.max(half + 16, Math.min(window.innerHeight - half - 16, pointer.y)));
        setActive(Number(row.dataset.workIndex));
        setVisible(true);
      } else setVisible(false);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(refreshHover); };
    const rememberPointer = (event) => {
      if (event.pointerType !== "mouse") return;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const leaveWindow = (event) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", rememberPointer, { passive: true });
    window.addEventListener("pointerout", leaveWindow);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", rememberPointer);
      window.removeEventListener("pointerout", leaveWindow);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [x, y]);

  const track = (event, index) => {
    if (event.pointerType !== "mouse") return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    const half = Math.min(window.innerWidth - 32, Math.max(240, window.innerWidth * 0.275)) / 2;
    const nextX = Math.max(half + 16, Math.min(window.innerWidth - half - 16, event.clientX));
    const nextY = Math.max(half + 16, Math.min(window.innerHeight - half - 16, event.clientY));
    if (!visible) { smoothX.jump(nextX); smoothY.jump(nextY); cursorX.jump(nextX); cursorY.jump(nextY); }
    x.set(nextX); y.set(nextY);
    setActive(index); setVisible(true);
  };

  return <div ref={workRef} id="selected-projects" className={styles.work} data-work-list>
    <p className={styles.label}>Recent work</p>
    {projects.length ? <ul className={styles.rows} onPointerLeave={() => setVisible(false)}>
      {projects.map((project, index) => <li key={project.slug}>
        <Link href={`/projects/${project.slug}`} className={styles.row} data-work-row data-work-index={index} onPointerEnter={(event) => track(event, index)} onPointerMove={(event) => track(event, index)} onClick={() => setVisible(false)}>
          <div className={styles.mobileCover}><WorkCover project={project} /></div>
          <h3>{project.title}</h3>
          <div className={styles.details}><span>{project.category}</span><span className={styles.period}>{project.period}</span></div>
        </Link>
      </li>)}
    </ul> : <p className={styles.empty}>Projects will appear here when published.</p>}
    <div className={styles.more}><PortfolioButton href="/projects" size="large"><span>{archiveLabel || "More work"}</span><sup>{projects.length}</sup></PortfolioButton></div>
    {mounted && createPortal(<><motion.div className={styles.follower} style={{ x: reducedMotion ? x : smoothX, y: reducedMotion ? y : smoothY }} aria-hidden="true" data-work-follower data-visible={visible}>
      <div className={styles.preview}>
        <div className={styles.reel} style={{ transform: `translateY(-${active * 100}%)` }}>
          {projects.map((project) => <div key={project.slug} className={styles.slide}><WorkCover project={project} floating /></div>)}
        </div>
      </div>
    </motion.div>
    <motion.div className={styles.cursor} style={{ x: reducedMotion ? x : cursorX, y: reducedMotion ? y : cursorY }} aria-hidden="true" data-work-cursor data-visible={visible}>
      <span className={styles.view}><motion.span className={styles.ball} style={{ scaleX: reducedMotion ? 1 : scaleX, scaleY: reducedMotion ? 1 : scaleY }} /><motion.span className={styles.viewLabel} style={{ x: reducedMotion ? 0 : textX, y: reducedMotion ? 0 : textY }}>View</motion.span></span>
    </motion.div></>, document.body)}
  </div>;
}

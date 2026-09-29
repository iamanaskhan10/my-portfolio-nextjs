"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowDownToLine, ArrowUpRight, Pause, Play } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./SplitNameHero.module.css";

export default function SplitNameHero() {
  const { profile, site, projects } = usePortfolioContent();
  const rootRef = useRef(null);
  const zoomRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const frames = useMemo(() => projects.filter((project) => project.published !== false && project.cover?.src), [projects]);
  const current = reducedMotion ? 0 : active % Math.max(1, frames.length);
  const name = profile.name.trim().split(/\s+/);
  const firstName = name.shift();
  const lastName = name.join(" ");

  useEffect(() => {
    if (reducedMotion || frames.length < 2) return;
    const image = rootRef.current.querySelector('[data-work-reel] [data-active="true"] img');
    if (!image) return;
    const zoom = image.animate(
      [{ transform: "scale(1.16)" }, { transform: "scale(1)" }],
      { duration: 3600, easing: "linear", fill: "both" },
    );
    zoom.pause();
    zoomRef.current = zoom;
    zoom.onfinish = () => setActive((index) => (index + 1) % frames.length);
    return () => { zoom.onfinish = null; zoom.cancel(); zoomRef.current = null; };
  }, [current, frames, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || frames.length < 2) return;
    const root = rootRef.current;
    const portal = root.closest("#home");
    let visible = false;
    const sync = () => {
      const entrance = portal?.dataset.heroEntrance;
      const phase = portal?.dataset.portalPhase;
      // Freeze the live work frame during the cube fold and outside the hero.
      const playing = visible && !document.hidden && !paused && !interacting && (!entrance || entrance === "complete") && (!phase || phase === "hero");
      if (playing) zoomRef.current?.play();
      else zoomRef.current?.pause();
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    visibility.observe(root);
    const scene = new MutationObserver(sync);
    if (portal) scene.observe(portal, { attributes: true, attributeFilter: ["data-hero-entrance", "data-portal-phase"] });
    document.addEventListener("visibilitychange", sync);
    return () => {
      zoomRef.current?.pause();
      visibility.disconnect();
      scene.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [current, frames, interacting, paused, reducedMotion]);

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="hero-heading" data-split-hero>
      <div className={styles.portrait} aria-hidden="true">
        <Image src="/anas-khan-cutout.png" alt="" fill priority sizes="(max-width: 767px) 100vw, 65vw" className={styles.portraitImage} />
      </div>
      <div className={styles.topline}>
        <a className={styles.identity} href="#home" aria-label={`${profile.name} home`}><span>{firstName}</span><span>{lastName}</span></a>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <h1 id="hero-heading" className={styles.srOnly}>{profile.name} — {site.hero.lines.join(" / ")}</h1>
      <div className={styles.composition}>
      <div className={styles.nameStage} data-has-media={frames.length > 0}>
        <span className={`${styles.headline} ${styles.firstName}`} aria-hidden="true"><span>{site.hero.lines[0]}</span></span>
        {frames.length > 0 && (
          <div className={styles.reel} data-work-reel
            onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
            onFocus={() => setInteracting(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
            <Link href={`/projects/${frames[current].slug}`} className={styles.reelLink} aria-label={`View ${frames[current].title} case study`}>
              {frames.map((project, index) => (
                <span key={project.slug} className={styles.frame} data-active={index === current} aria-hidden="true">
                  <Image src={project.cover.src} alt="" fill priority={index === 0} sizes="(max-width: 767px) 20vw, 9vw" />
                </span>
              ))}
              <span className={styles.reelArrow}><ArrowUpRight size={21} aria-hidden="true" /></span>
            </Link>
            <div className={styles.reelCaption}>
              <span>{frames[current].title}</span>
              {!reducedMotion && frames.length > 1 && (
                <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play work preview" : "Pause work preview"} aria-pressed={paused}>
                  {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        )}
        <span className={`${styles.headline} ${styles.lastName}`} aria-hidden="true">&amp;</span>
      </div>
      <div className={styles.editorial}>
        <p className={styles.introduction}>I&apos;m {firstName}. I build full-stack products and turn applied AI into useful experiences.</p>
        <p className={styles.leadDiscipline} aria-hidden="true">{site.hero.lines[1]}</p>
      </div>
      <div className={styles.finalRow}>
        <p className={styles.discipline} aria-hidden="true">{site.hero.lines.slice(2).join(" ")}</p>
        {frames.length > 0 && <Link href="/projects" className={styles.projectCount}><span>{frames.length}</span><span>Projects</span></Link>}
        <a href="#projects" className={styles.workArrow} aria-label="Explore my projects"><ArrowDown strokeWidth={1.8} aria-hidden="true" /></a>
      </div>
      </div>
      <div className={styles.bottomline}>
          <div className={styles.resume}>
            <a href={profile.resume} download>{site.hero.downloadLabel}<ArrowDownToLine size={15} aria-hidden="true" /></a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">{site.hero.viewLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <a className={styles.scroll} href="#about">Scroll<ArrowDown size={19} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

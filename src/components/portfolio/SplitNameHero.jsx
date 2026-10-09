"use client";


import PortfolioButton from "./PortfolioButton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./SplitNameHero.module.css";

export default function SplitNameHero() {
  const { profile, site, projects } = usePortfolioContent();
  const rootRef = useRef(null);
  const reelMotionRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const [active, setActive] = useState(0);
  const reelComplete = useRef(false);
  const [interacting, setInteracting] = useState(false);
  const frames = useMemo(() => projects.filter((project) => project.published !== false && project.cover?.src), [projects]);
  const current = reducedMotion ? 0 : active % Math.max(1, frames.length);
  const name = profile.name.trim().split(/\s+/);
  const firstName = name.shift();
  const lastName = name.join(" ");

  useEffect(() => {
    if (reducedMotion || frames.length < 2 || reelComplete.current) return;
    const image = rootRef.current.querySelector('[data-work-reel] [data-active="true"]');
    if (!image) return;
    const motion = image.animate(
      [
        { transform: current === 0 ? "translateY(0) rotate(0deg) scale(1)" : "translateY(105%) rotate(7deg) scale(0.92)", offset: 0 },
        { transform: "translateY(-10%) rotate(-3deg) scale(1.025)", offset: 0.38 },
        { transform: "translateY(4%) rotate(1deg) scale(0.99)", offset: 0.56 },
        { transform: "translateY(0) rotate(0deg) scale(1)", offset: 0.72 },
        { transform: "translateY(0) rotate(0deg) scale(1)", offset: 1 },
      ],
      { duration: 680, easing: "ease-out", fill: "both" },
    );
    motion.pause();
    reelMotionRef.current = motion;
    motion.onfinish = () => {
      // A short burst settles by itself, so the clean preview needs no player UI.
      if (current >= Math.min(frames.length - 1, 4)) reelComplete.current = true;
      else setActive((index) => index + 1);
    };
    return () => { motion.onfinish = null; motion.cancel(); reelMotionRef.current = null; };
  }, [current, frames, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || frames.length < 2) return;
    const root = rootRef.current;
    const portal = root.closest("#home");
    let visible = false;
    const sync = () => {
      if (reelComplete.current) return;
      const entrance = portal?.dataset.heroEntrance;
      const phase = portal?.dataset.portalPhase;
      // Freeze the live work frame during the cube fold and outside the hero.
      const playing = visible && !document.hidden && !interacting && (!entrance || entrance === "complete") && (!phase || phase === "hero");
      if (playing) reelMotionRef.current?.play();
      else reelMotionRef.current?.pause();
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    visibility.observe(root);
    const scene = new MutationObserver(sync);
    if (portal) scene.observe(portal, { attributes: true, attributeFilter: ["data-hero-entrance", "data-portal-phase"] });
    document.addEventListener("visibilitychange", sync);
    return () => {
      reelMotionRef.current?.pause();
      visibility.disconnect();
      scene.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [current, frames, interacting, reducedMotion]);

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
            </Link>

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
            <PortfolioButton size="small" href={profile.resume} download>{site.hero.downloadLabel}<ArrowDownToLine size={15} aria-hidden="true" /></PortfolioButton>
            <PortfolioButton size="small" href={profile.resume} target="_blank" rel="noopener noreferrer">{site.hero.viewLabel}<ArrowUpRight size={15} aria-hidden="true" /></PortfolioButton>
          </div>
          <a className={styles.scroll} href="#about">Scroll<ArrowDown size={19} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

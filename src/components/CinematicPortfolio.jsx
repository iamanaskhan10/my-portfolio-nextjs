"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import PostHeroEditorial from "./PostHeroEditorial";
import BrandWatermark from "./portfolio/BrandWatermark";
import LaserFrame from "./portfolio/LaserFrame";
import { usePortfolioContent } from "../context/PortfolioContentContext";
import useMotionPreference from "../hooks/useMotionPreference";
import styles from "./CinematicPortfolio.module.css";

export default function CinematicPortfolio() {
  const { profile, site } = usePortfolioContent();
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const portraitRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const hero = heroRef.current;
    const mobile = window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)");
    let measuredWidth;

    const clearSize = () => {
      hero.style.removeProperty("--hero-scene-height");
      hero.style.removeProperty("--hero-portrait-height");
    };
    const measure = () => {
      const width = document.documentElement.clientWidth;
      // Browser bars and keyboards change height while scrolling. Only a
      // width change (including rotation) should resize the mobile artwork.
      if (width === measuredWidth) return;
      measuredWidth = width;
      clearSize();
      if (!mobile.matches) return;
      const sceneHeight = sceneRef.current.offsetHeight;
      const portraitHeight = portraitRef.current.offsetHeight;
      hero.style.setProperty("--hero-scene-height", `${sceneHeight}px`);
      hero.style.setProperty("--hero-portrait-height", `${portraitHeight}px`);
    };
    const onDeviceChange = () => { measuredWidth = undefined; measure(); };

    measure();
    window.addEventListener("resize", measure);
    mobile.addEventListener("change", onDeviceChange);
    return () => {
      window.removeEventListener("resize", measure);
      mobile.removeEventListener("change", onDeviceChange);
      clearSize();
    };
  }, []);

  return (
    <div className={styles.portfolio}>
      <motion.section
        ref={heroRef}
        id="home"
        className={styles.hero}
        aria-labelledby="hero-heading"
        style={{ "--hero-scroll": reducedMotion ? 0 : scrollYProgress }}
      >
        <div ref={sceneRef} className={styles.heroScene}>
          <LaserFrame variant="hero" />

          <div className={styles.statement}>
          <h1 id="hero-heading" className={styles.title}>
            {site.hero.lines.map((line, index) => (
              <span className={styles.titleLine} key={line}><span className={styles.titleWord}>{index === 0 ? <strong>{line}</strong> : line}</span></span>
            ))}
          </h1>
          <div className={styles.exploreLinks}>
            <a href={profile.resume} download>{site.hero.downloadLabel} <ArrowDownToLine size={16} aria-hidden="true" /></a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">{site.hero.viewLabel} <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          </div>

          <figure ref={portraitRef} className={styles.portrait}>
          <BrandWatermark variant="hero" />
          <Image
            className={styles.portraitImage}
            src="/anas-khan-cutout.png"
            alt="Portrait of Anas Khan"
            fill
            priority
            sizes="(max-width: 767px) 118vw, (max-width: 1100px) 62vw, 54vw"
          />
          </figure>

          <p className={styles.name} aria-hidden="true"><span>Anas</span>{" "}<span>Khan</span></p>

          <a className={styles.hire} href="#contact" aria-label="Let's talk">
            <span>{site.hero.ctaLabel}</span>
          </a>
        </div>
      </motion.section>
      <PostHeroEditorial />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import PostHeroEditorial from "./PostHeroEditorial";
import BrandWatermark from "./portfolio/BrandWatermark";
import LaserFrame from "./portfolio/LaserFrame";
import { profile } from "../data/portfolio";
import useMotionPreference from "../hooks/useMotionPreference";
import styles from "./CinematicPortfolio.module.css";

export default function CinematicPortfolio() {
  const heroRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  return (
    <div className={styles.portfolio}>
      <motion.section
        ref={heroRef}
        id="home"
        className={styles.hero}
        aria-labelledby="hero-heading"
        style={{ "--hero-scroll": reducedMotion ? 0 : scrollYProgress }}
      >
        <div className={styles.heroScene}>
          <LaserFrame variant="hero" />

          <div className={styles.statement}>
          <h1 id="hero-heading" className={styles.title}>
            <span className={styles.titleLine}><span className={styles.titleWord}><strong>Full-stack</strong></span></span>
            <span className={styles.titleLine}><span className={styles.titleWord}>Engineer.</span></span>
            <span className={styles.titleLine}><span className={styles.titleWord}>Applied AI.</span></span>
          </h1>
          <div className={styles.exploreLinks}>
            <a href={profile.resume} download>Download resume <ArrowDownToLine size={16} aria-hidden="true" /></a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">View resume <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          </div>

          <figure className={styles.portrait}>
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
            <span>Let&apos;s talk</span>
          </a>
        </div>
      </motion.section>
      <PostHeroEditorial />
    </div>
  );
}

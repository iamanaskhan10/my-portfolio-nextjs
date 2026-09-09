"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiences, outcomes, profile } from "../../data/portfolio";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ExperienceShowcase.module.css";

function ExperienceCard({ experience, index, progress, animate }) {
  const y = useTransform(progress, [0, 1], [32 + index * 12, -24 - index * 8]);
  const rotate = useTransform(progress, [0, 1], index % 2 ? [1.8, -0.8] : [-1.8, 0.8]);
  return (
    <motion.li className={styles.card} style={animate ? { y, rotate, zIndex: index + 1 } : undefined}>
      <div><h3>{experience.role}</h3><p>{experience.company}</p></div>
      <span className={styles.duration}>{experience.duration}</span>
    </motion.li>
  );
}

export default function ExperienceShowcase() {
  const sectionRef = useRef(null);
  const reducedMotion = useMotionPreference();
  const animate = reducedMotion === false;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div ref={sectionRef} className={styles.scrollSpace} data-motion={animate}>
        <div className={styles.scene}>
          <motion.h2 id="experience-heading" className={styles.title} style={animate ? { x } : undefined}>Work experience</motion.h2>
          <div className={styles.foreground}>
            <ol className={styles.cards}>
              {experiences.map((experience, index) => <ExperienceCard key={`${experience.role}-${experience.company}`} experience={experience} index={index} progress={scrollYProgress} animate={animate} />)}
            </ol>
            <a className={styles.resume} href={profile.resume} target="_blank" rel="noopener noreferrer">View résumé <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className={styles.outcomes}>
        <h3>Selected work outcomes</h3>
        <ul>{outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
      </div>
    </section>
  );
}

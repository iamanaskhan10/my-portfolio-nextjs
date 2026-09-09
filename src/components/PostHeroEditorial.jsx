"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import PortfolioContactForm from "./portfolio/PortfolioContactForm";
import TechnologyStack from "./portfolio/TechnologyStack";
import BrandWatermark from "./portfolio/BrandWatermark";
import ProjectShowcase from "./portfolio/ProjectShowcase";
import ExperienceShowcase from "./portfolio/ExperienceShowcase";
import { profile } from "../data/portfolio";
import styles from "./PostHeroEditorial.module.css";


export default function PostHeroEditorial() {
  return (
    <>
      <section className={styles.about} id="about" aria-labelledby="manifesto-heading">
        <div className={styles.aboutInner}>
          <h2 id="manifesto-heading" className={styles.aboutTitle}>I learn.<br /><span>I build.</span><br />I ship.</h2>
          <div className={styles.aboutCopy}>
            <h3>Engineering products that ship.</h3>
            <p>
            I&apos;m a software engineer focused on full-stack and applied AI products. My work spans React and Next.js interfaces, FastAPI and Node.js services, PostgreSQL data systems, and real-time AI workflows.
            </p>
            <a className={styles.inlineLink} href="#capabilities">Explore my toolkit <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <TechnologyStack />

      <ProjectShowcase />

      <ExperienceShowcase />

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <BrandWatermark />
        <div className={styles.sectionIntro}>
          <h2 id="contact-heading">Have something worth making better?</h2>
          <p>
            I&apos;m open to work where thoughtful product decisions, full-stack engineering, or applied AI can create a meaningful improvement.
          </p>
          <div className={styles.contactLinks}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
            <a href={`mailto:${profile.email}`}><Mail size={17} aria-hidden="true" /> Email</a>
          </div>
        </div>
        <PortfolioContactForm active />
      </section>
    </>
  );
}

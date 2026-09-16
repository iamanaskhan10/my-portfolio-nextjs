"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import ScrollReveal from "./portfolio/ScrollReveal";
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
          <ScrollReveal as="h2" id="manifesto-heading" className={styles.aboutTitle} variant="phrases">
            <span>I learn.</span><span>I build.</span><span>I ship.</span>
          </ScrollReveal>
          <ScrollReveal className={styles.aboutCopy}>
            <h3>Building full-stack products across real-time AI, computer vision and data-intensive systems.</h3>
            <p>
            I&apos;m a software engineer focused on full-stack and applied AI products. My work spans React and Next.js interfaces, FastAPI and Node.js services, PostgreSQL data systems, and real-time AI workflows.
            </p>
            <a className={styles.inlineLink} href="#capabilities">Explore my toolkit <ArrowDown size={16} aria-hidden="true" /></a>
          </ScrollReveal>
        </div>
      </section>

      <TechnologyStack />

      <ExperienceShowcase />

      <ProjectShowcase />

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <BrandWatermark />
        <ScrollReveal className={styles.sectionIntro}>
          <h2 id="contact-heading">Have something worth making better?</h2>
          <p>
            I&apos;m open to work where thoughtful product decisions, full-stack engineering, or applied AI can create a meaningful improvement.
          </p>
          <div className={styles.contactLinks}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
            <a href={`mailto:${profile.email}`}><Mail size={17} aria-hidden="true" /> Email</a>
          </div>
        </ScrollReveal>
        <ScrollReveal><PortfolioContactForm active /></ScrollReveal>
      </section>
    </>
  );
}

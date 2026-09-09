"use client";

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import PortfolioContactForm from "./portfolio/PortfolioContactForm";
import TechnologyStack from "./portfolio/TechnologyStack";
import BrandWatermark from "./portfolio/BrandWatermark";
import ProjectShowcase from "./portfolio/ProjectShowcase";
import { experiences, outcomes, profile } from "../data/portfolio";
import styles from "./PostHeroEditorial.module.css";


export default function PostHeroEditorial() {
  return (
    <>
      <section className={styles.about} id="about" aria-labelledby="manifesto-heading">
        <div className={styles.aboutInner}>
          <h2 id="manifesto-heading" className={styles.aboutTitle}>I learn.<br /><span>I build.</span><br />I ship.</h2>
          <div className={styles.aboutCopy}>
            <h3>Full-stack. AI-aware.</h3>
            <p>
            I&apos;m a Software Engineering student at FAST-NUCES, Lahore (2022&ndash;2026), focused on full-stack and applied AI products. My work spans React and Next.js interfaces, FastAPI and Node.js services, PostgreSQL data workflows, and real-time RAG systems &mdash; built to be useful, reliable, and ready to ship.
            </p>
            <a className={styles.inlineLink} href="#capabilities">Explore my toolkit <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <TechnologyStack />

      <ProjectShowcase />

      <section className={styles.proof} id="experience" aria-labelledby="proof-heading">
        <div className={styles.sectionIntro}>
          <h2 id="proof-heading">Delivery is the through line.</h2>
          <p>
            I approach engineering as an end-to-end practice: understand the job, make the system clear, and stay close enough to the outcome to improve it.
          </p>
        </div>
        <div className={styles.proofDetails}>
          <ol className={styles.timeline}>
            {experiences.map((experience) => (
              <li key={`${experience.role}-${experience.company}`}>
                <div>
                  <h3>{experience.role}</h3>
                  <p>{experience.company}</p>
                </div>
                <time>{experience.duration}</time>
              </li>
            ))}
          </ol>
          <ul className={styles.outcomes}>
            {outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
          </ul>
        </div>
      </section>

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

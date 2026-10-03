"use client";

import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import ScrollReveal from "./portfolio/ScrollReveal";
import PortfolioContactForm from "./portfolio/PortfolioContactForm";
import TechnologyStack from "./portfolio/TechnologyStack";
import ProjectShowcase from "./portfolio/ProjectShowcase";
import ExperienceShowcase from "./portfolio/ExperienceShowcase";
import { usePortfolioContent } from "../context/PortfolioContentContext";
import styles from "./PostHeroEditorial.module.css";


export default function PostHeroEditorial() {
  const { profile, site } = usePortfolioContent();
  return (
    <>
      <ProjectShowcase />

      <section className={styles.about} id="about" aria-labelledby="manifesto-heading">
        <div className={styles.aboutInner}>
          <ScrollReveal as="h2" id="manifesto-heading" className={styles.aboutTitle} variant="phrases">
            {site.about.phrases.map((phrase) => <span key={phrase}>{phrase}</span>)}
          </ScrollReveal>
          <ScrollReveal className={styles.aboutCopy}>
            <h3>{site.about.heading}</h3>
            <p>{site.about.body}</p>
            <a className={styles.inlineLink} href="#capabilities">{site.about.linkLabel} <ArrowDown size={16} aria-hidden="true" /></a>
          </ScrollReveal>
        </div>
      </section>

      <TechnologyStack />

      <ExperienceShowcase />

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <ScrollReveal className={styles.contactHeading}>
          <h2 id="contact-heading">{site.contact.heading}</h2>
        </ScrollReveal>
        <ScrollReveal className={styles.sectionIntro}>
          <p>{site.contact.body}</p>
          <a className={styles.contactEmail} href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={25} aria-hidden="true" /></a>
          <div className={styles.contactLinks}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
          </div>
        </ScrollReveal>
        <ScrollReveal><PortfolioContactForm active /></ScrollReveal>
      </section>
    </>
  );
}

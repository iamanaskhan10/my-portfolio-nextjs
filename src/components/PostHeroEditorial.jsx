"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import ScrollReveal from "./portfolio/ScrollReveal";
import PortfolioContactForm from "./portfolio/PortfolioContactForm";
import TechnologyStack from "./portfolio/TechnologyStack";
import BrandWatermark from "./portfolio/BrandWatermark";
import ProjectShowcase from "./portfolio/ProjectShowcase";
import ExperienceShowcase from "./portfolio/ExperienceShowcase";
import { usePortfolioContent } from "../context/PortfolioContentContext";
import styles from "./PostHeroEditorial.module.css";


export default function PostHeroEditorial() {
  const { profile, site } = usePortfolioContent();
  return (
    <>
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

      <ProjectShowcase />

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <BrandWatermark />
        <ScrollReveal className={styles.sectionIntro}>
          <h2 id="contact-heading">{site.contact.heading}</h2>
          <p>{site.contact.body}</p>
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

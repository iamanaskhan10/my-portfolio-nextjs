"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import ScrollReveal from "./ScrollReveal";
import styles from "./ProjectShowcase.module.css";

function SelectedProject({ project, index }) {
  return (
    <article className={styles.project} data-reversed={index % 2 === 1} aria-labelledby={`${project.slug}-title`}>
      <span className={styles.number} aria-hidden="true">{project.number}</span>
      <ScrollReveal as="figure" className={styles.visual} variant="image">
        <Image src={project.cover.src} alt={project.cover.alt} width={project.gallery[0].width} height={project.gallery[0].height}
          sizes="(max-width: 900px) 100vw, (max-width: 1440px) 55vw, 750px" />
        <figcaption>{project.cover.caption}</figcaption>
      </ScrollReveal>
      <ScrollReveal className={styles.copy}>
        <div className={styles.meta}><span>{project.group}</span><span>{project.period}</span></div>
        <h3 id={`${project.slug}-title`}>{project.title}</h3>
        <p>{project.description}</p>
        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {project.stack.split(/\s*·\s*/).map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <Link className={styles.projectLink} href={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>
          View Project <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </ScrollReveal>
    </article>
  );
}

export default function ProjectShowcase() {
  const { projects, site } = usePortfolioContent();
  const featured = projects.filter((project) => project.featured);
  const selectedWork = (featured.length ? featured : projects.slice(0, 2)).slice(0, 4);
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.inner}>
        <ScrollReveal className={styles.heading}>
          <h2 id="projects-heading">{site.projects.heading}</h2>
          <Link className={styles.archiveLink} href="/projects">{site.projects.archiveLabel} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </ScrollReveal>
        {selectedWork.map((project, index) => <SelectedProject key={project.slug} project={project} index={index} />)}
      </div>
    </section>
  );
}

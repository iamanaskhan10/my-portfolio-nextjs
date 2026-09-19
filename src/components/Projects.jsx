"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { profile } from "../data/portfolio";
import ProjectMetric from "./portfolio/ProjectMetric";
import Link from "next/link";
import Image from "next/image";
import styles from "./Projects.module.css";

const categories = ["All", "AI", "Full-stack"];
const compositions = {
  "voiceforge-ai": "voice",
  tradem8: "market",
  "tecaudex-website-cms": "publishing",
  darzixpress: "tailoring",
};

function ProjectArtwork({ project, priority }) {
  const cover = project.gallery[0];
  const detail = project.gallery[2];

  return (
    <figure className={styles.artwork}>
      <Link className={styles.composition} href={"/projects/" + project.slug}
        data-composition={compositions[project.slug]} aria-label={"Explore " + project.title}>
        <span className={styles.mainPrint} data-kind={cover.kind}>
          <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height}
            priority={priority} sizes="(max-width: 767px) 80vw, 48vw" />
        </span>
        <span className={styles.detailPrint}>
          <Image src={detail.src} alt={detail.alt} width={detail.width} height={detail.height}
            sizes="(max-width: 767px) 44vw, 26vw" />
        </span>
        <span className={styles.open}><ArrowUpRight size={23} aria-hidden="true" /></span>
      </Link>
      <figcaption>{cover.kind === "screenshot" ? "Product screenshots" : cover.kind === "brand" ? "Project identity & workflow illustration" : "System & implementation illustrations"}</figcaption>
    </figure>
  );
}

export default function Projects({ showAll = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects = caseStudies.filter(project => activeCategory === "All" || project.group === activeCategory);

  return (
    <section className={styles.archive} id="projects" aria-labelledby="archive-heading">
      <div className={styles.inner}>
        <div className={styles.topbar}>
          <Link className={styles.textLink} href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</Link>
          <a className={styles.textLink} href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>

        <header className={styles.heading}>
          <h1 id="archive-heading">Selected<br /><span>projects.</span></h1>
          <div className={styles.introduction}>
            <p>From a conversation grounded in documents to a service that connects people. A closer look at what I build, and how it works.</p>
            <a className={styles.textLink} href="#project-gallery">Explore the work <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </header>

        <div className={styles.toolbar}>
          {showAll && <div className={styles.filters} role="group" aria-label="Filter projects">
            {categories.map(category => (
              <button key={category} type="button" aria-pressed={activeCategory === category} aria-controls="project-gallery" onClick={() => setActiveCategory(category)}>
                {category}<span>{category === "All" ? caseStudies.length : caseStudies.filter(project => project.group === category).length}</span>
              </button>
            ))}
          </div>}
          <p className={styles.count} role="status">{String(visibleProjects.length).padStart(2, "0")} projects</p>
        </div>

        <div id="project-gallery" className={styles.grid} data-filtered={activeCategory !== "All"}>
          {visibleProjects.map((project, index) => (
            <article key={project.slug} className={styles.project} aria-labelledby={"title-" + project.slug}>
              <ProjectArtwork project={project} priority={index === 0} />
              <div className={styles.projectBody}>
                <div className={styles.meta}><span>{project.group}</span><span>{project.period}</span></div>
                <h2 id={"title-" + project.slug}><Link href={"/projects/" + project.slug}>{project.title}</Link></h2>
                <p className={styles.description}>{project.description}</p>
                <ProjectMetric metric={project.metric} />
                <ul className={styles.technologies} aria-label={project.title + " technologies"}>
                  {project.stack.split(" · ").map(tool => <li key={tool}>{tool}</li>)}
                </ul>
                <div className={styles.actions}>
                  <Link className={styles.projectLink} href={"/projects/" + project.slug}>Explore project <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  {project.sourceAvailable === false ? (
                    <Link className={styles.textLink} href="/#contact">Discuss project <ArrowUpRight size={15} aria-hidden="true" /></Link>
                  ) : (
                    <a className={styles.textLink} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={project.title + " on GitHub"}><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.closing}>
          <p>Something you’d like to build?</p>
          <Link href="/#contact">Let’s talk <ArrowUpRight size={24} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

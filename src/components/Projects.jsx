"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import Link from "next/link";
import Image from "next/image";
import styles from "./Projects.module.css";

const categories = ["All", "AI", "Full-stack"];

export default function Projects({ showAll = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects = caseStudies.filter(project => activeCategory === "All" || project.group === activeCategory);

  return (
    <section className={styles.archive} id="projects" aria-labelledby="archive-heading">
      <div className={styles.inner}>
        <Link className={styles.back} href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</Link>
        <div className={styles.heading}>
          <h1 id="archive-heading">Selected projects.</h1>
          <p>A focused set of AI, full-stack, and product-engineering projects from my résumé.</p>
        </div>
        {showAll && <div className={styles.filters} role="group" aria-label="Filter projects">
          {categories.map(category => <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>}
        <div className={styles.grid}>
          {visibleProjects.map(project => (
            <Link key={project.slug} className={styles.project} href={`/projects/${project.slug}`}>
              <div className={styles.cover} data-kind={project.cover.kind}>
                <Image src={project.cover.src} alt={project.cover.alt} width={project.gallery[0].width} height={project.gallery[0].height} sizes="(max-width: 767px) 90vw, 42vw" />
                <span className={styles.open}><ArrowUpRight size={24} aria-hidden="true" /></span>
              </div>
              <div className={styles.meta}><span>{project.group} / {project.cover.kind === "brand" ? "Project identity" : "System illustration"}</span><span>{project.period}</span></div>
              <h2>{project.title}</h2>
              <p className={styles.description}>{project.description}</p>
              <span className={styles.read}>Explore project <ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

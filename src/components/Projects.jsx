"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies as projects } from "../data/caseStudies";
import Link from "next/link";
import Image from "next/image";

const categories = ["All", "AI", "Full-stack"];

function projectGroup(project) {
  return project.group;
}

export default function Projects({ showAll = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects = projects.filter(
    (project) => activeCategory === "All" || projectGroup(project) === activeCategory,
  );

  return (
    <section className="case-studies" id="projects">
      <div className="case-studies__inner">
        <a className="case-studies__back" href="/#projects">
          <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
        </a>
        <div className="case-studies__heading">
          <h1>Project case studies.</h1>
          <span>
            A focused set of AI, full-stack, and product-engineering projects from my résumé.
          </span>
        </div>

        {showAll && (
          <div className="case-studies__filters" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="case-studies__grid">
          {visibleProjects.map((project) => {
            const content = (
              <>
                <div className="case-studies__cover" data-kind={project.cover.kind}>
                  <Image src={project.cover.src} alt={project.cover.alt} width={1440} height={810} sizes="(max-width: 767px) 90vw, 43vw" />
                </div>
                <header>
                  <p>{project.number} / {project.category}</p>
                  <span>{project.period}</span>
                </header>
                <h2>{project.title}</h2>
                <p className="case-studies__description">{project.description}</p>
                <ul>
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <p className="case-studies__stack">{project.stack}</p>
              </>
            );

            return project.link ? (
              <Link
                key={project.title}
                className="case-studies__card"
                href={`/projects/${project.slug}`}
              >
                {content}
                <span className="case-studies__read">Read case study</span>
                <ArrowUpRight className="case-studies__arrow" size={18} aria-hidden="true" />
              </Link>
            ) : (
              <article key={project.title} className="case-studies__card">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

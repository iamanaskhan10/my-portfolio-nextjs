"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";

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
          <p>Selected work</p>
          <h1>Systems designed for useful outcomes.</h1>
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
              <a
                key={project.title}
                className="case-studies__card"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
                <ArrowUpRight className="case-studies__arrow" size={18} aria-hidden="true" />
              </a>
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

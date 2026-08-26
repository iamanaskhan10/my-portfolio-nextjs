"use client";

import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/portfolio";

export default function ProjectGrid({ active }) {
  return (
    <div className="engineering-project-grid">
      {projects.map((project) => {
        const card = (
          <>
            <div className="engineering-project-card__media" aria-hidden="true">
              <img src={project.image} alt="" />
              <span>{project.number}</span>
              <small>{project.period}</small>
            </div>
            <div className="engineering-project-card__body">
              <p>{project.category}</p>
              <div>
                <h3>{project.title}</h3>
                {project.link && <ArrowUpRight size={17} aria-hidden="true" />}
              </div>
              <span>{project.description}</span>
            </div>
          </>
        );

        return project.link ? (
          <a
            key={project.title}
            className="engineering-project-card"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? 0 : -1}
          >
            {card}
          </a>
        ) : (
          <article key={project.title} className="engineering-project-card" aria-label={`${project.title}: ${project.category}`}>
            {card}
          </article>
        );
      })}
    </div>
  );
}

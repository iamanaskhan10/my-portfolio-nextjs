import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import CaseStudyGallery from "./CaseStudyGallery";
import styles from "./CaseStudy.module.css";

export default function CaseStudy({ project, nextProject }) {
  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero}>
        <Link className={styles.back} href="/projects"><ArrowLeft size={16} aria-hidden="true" /> All case studies</Link>
        <h1>{project.title}</h1>
        <p className={styles.headline}>{project.headline}</p>
        <div className={styles.heroBottom}>
          <dl className={styles.meta}>
            <div><dt>Project</dt><dd>{project.category}</dd></div>
            <div><dt>Year</dt><dd>{project.period}</dd></div>
          </dl>
          {project.sourceAvailable === false ? (
            <Link className={styles.source} href="/#contact">Discuss this project <ArrowUpRight size={17} aria-hidden="true" /></Link>
          ) : (
            <a className={styles.source} href={project.link} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={17} aria-hidden="true" /></a>
          )}
        </div>
      </header>

      <CaseStudyGallery key={project.slug} images={project.gallery} title={project.title} />

      <div className={styles.body}>
        <aside className={styles.aside}>
          <nav aria-label="Case study contents">
            <a href="#gallery">Image gallery</a>
            <a href="#problem">The problem</a>
            <a href="#implementation">Implementation</a>
            <a href="#decisions">Key decisions</a>
            <a href="#outcomes">Outcomes</a>
          </nav>
          <h2>Built with</h2>
          <ul className={styles.stack}>{project.stack.split(" · ").map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </aside>
        <div className={styles.story}>
          <section id="problem">
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section id="implementation">
            <h2>Implementation</h2>
            <p>{project.approach}</p>
            <figure className={styles.workflow}>
              <figcaption>Workflow overview</figcaption>
              <ol>{project.flow.map((step, index) => <li key={step}><span>{step}</span>{index < project.flow.length - 1 && <ArrowRight size={17} aria-hidden="true" />}</li>)}</ol>
            </figure>
          </section>
          <section id="decisions">
            <h2>Key decisions</h2>
            <dl className={styles.decisions}>{project.decisions.map((decision) => <div key={decision.title}><dt>{decision.title}</dt><dd>{decision.body}</dd></div>)}</dl>
          </section>
          <section id="outcomes">
            <h2>Outcomes</h2>
            <ul className={styles.outcomes}>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            <p>{project.takeaway}</p>
          </section>
        </div>
      </div>
      <Link href={`/projects/${nextProject.slug}`} className={styles.next}>
        <span>Next case study<strong>{nextProject.title}</strong></span><ArrowUpRight size={32} aria-hidden="true" />
      </Link>
    </article>
  );
}

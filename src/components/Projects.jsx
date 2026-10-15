"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Grid2X2, List, Pause, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePortfolioContent } from "../context/PortfolioContentContext";
import useMotionPreference from "../hooks/useMotionPreference";
import { transitionProject } from "../lib/animation/transitionProject";
import SectionHeading from "./portfolio/SectionHeading";
import PortfolioButton from "./portfolio/PortfolioButton";
import ProjectWorkList from "./portfolio/ProjectWorkList";
import ProjectMetric from "./portfolio/ProjectMetric";
import styles from "./Projects.module.css";

function ProjectImage({ project, priority = false }) {
  const [failed, setFailed] = useState(false);
  const cover = project.cover?.src ? project.cover : project.gallery?.[0];
  const src = /\.gif(?:\?|$)/i.test(cover?.src || "")
    ? project.showcase?.posterSrc || project.gallery?.find(image => !/\.gif(?:\?|$)/i.test(image.src))?.src
    : cover?.src;
  return src && !failed ? <Image src={src} alt={cover?.alt || project.title + " preview"} fill priority={priority}
    sizes="(max-width: 767px) 90vw, 48vw" onError={() => setFailed(true)} />
    : <span className={styles.unavailable}>{project.title}<small>Preview coming soon</small></span>;
}

function ProjectReel({ projects, navigate }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reelRef = useRef(null);
  const paused = useRef(false);
  const reducedMotion = useMotionPreference();
  useEffect(() => {
    if (reducedMotion || !playing || projects.length < 2) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.35 });
    observer.observe(reelRef.current);
    const timer = window.setInterval(() => {
      if (visible && !document.hidden && !paused.current) setActive(index => (index + 1) % projects.length);
    }, 4800);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [projects.length, reducedMotion, playing]);
  if (!projects.length) return null;
  return <div ref={reelRef} className={styles.feature} data-project-reel
    onPointerEnter={() => { paused.current = true; }}
    onPointerLeave={() => { paused.current = reelRef.current.contains(document.activeElement); }}
    onFocusCapture={() => { paused.current = true; }}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) paused.current = false; }}>
    <div className={styles.reelWindow}>
      <div className={styles.reelTrack} style={{ transform: "translateY(-" + active * 100 + "%)" }}>
        {projects.map((project, index) => <Link key={project.slug} href={"/projects/" + project.slug} className={styles.reelSlide}
          aria-hidden={active !== index} tabIndex={active === index ? 0 : -1} onClick={event => navigate(event, project.slug)}>
          <ProjectImage project={project} priority={index === 0} />
          <span className={styles.imageAction}>Explore project <ArrowUpRight size={17} aria-hidden="true" /></span>
        </Link>)}
      </div>
    </div>
    <div className={styles.reelCaption}>
      <Link href={"/projects/" + projects[active].slug} onClick={event => navigate(event, projects[active].slug)}>{projects[active].title}</Link>
      <div className={styles.reelControls}>
        <span aria-label={"Preview " + (active + 1) + " of " + projects.length}>{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        {!reducedMotion && projects.length > 1 && <button type="button" aria-label={playing ? "Pause preview rotation" : "Play preview rotation"} onClick={() => setPlaying(value => !value)}>{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>}
        <button type="button" aria-label="Previous project preview" disabled={projects.length < 2} onClick={() => setActive(index => (index - 1 + projects.length) % projects.length)}><ArrowLeft size={18} aria-hidden="true" /></button>
        <button type="button" aria-label="Next project preview" disabled={projects.length < 2} onClick={() => setActive(index => (index + 1) % projects.length)}><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </div>;
}

export default function Projects({ showAll = false }) {
  const { projects: caseStudies, profile, site } = usePortfolioContent();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState("index");
  const categories = ["All", ...new Set(caseStudies.map(project => project.group))];
  const visibleProjects = caseStudies.filter(project => activeCategory === "All" || project.group === activeCategory);
  const navigate = (event, slug) => transitionProject(event, router, "/projects/" + slug);

  return <section className={styles.archive} id="projects" aria-labelledby="archive-heading">
    <div className={styles.inner}>
      <div className={styles.topbar}>
        <PortfolioButton variant="secondary" size="small" href="/#selected-projects"><ArrowLeft size={16} aria-hidden="true" /> Portfolio</PortfolioButton>
        <a className={styles.textLink} href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <header className={styles.heading}>
        <div className={styles.introduction}>
          <SectionHeading as="h1" id="archive-heading">{site.projects.archiveHeading}<br /><span>{site.projects.archiveAccent}</span></SectionHeading>
          <p>{site.projects.archiveIntro}</p>
          <a className={styles.exploreLink} href="#project-gallery">{site.projects.archiveExploreLabel}<ArrowRight size={19} aria-hidden="true" /></a>
        </div>
        <ProjectReel projects={caseStudies} navigate={navigate} />
      </header>
      <div className={styles.toolbar}>
        {showAll && <div className={styles.filters} role="group" aria-label="Filter projects">
          {categories.map(category => <button key={category} type="button" aria-pressed={activeCategory === category} aria-controls="project-gallery" onClick={() => setActiveCategory(category)}>
            {category}<sup>{category === "All" ? caseStudies.length : caseStudies.filter(project => project.group === category).length}</sup>
          </button>)}
        </div>}
        <div className={styles.viewSwitch} role="group" aria-label="Project layout">
          <button type="button" aria-pressed={view === "index"} aria-controls="project-gallery" onClick={() => setView("index")}><List size={18} aria-hidden="true" /><span>Index</span></button>
          <button type="button" aria-pressed={view === "gallery"} aria-controls="project-gallery" onClick={() => setView("gallery")}><Grid2X2 size={17} aria-hidden="true" /><span>Gallery</span></button>
        </div>
      </div>
      <div className={styles.resultHeading}><span>{view === "index" ? "Project / Discipline" : "Project gallery"}</span><span role="status">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</span></div>
      <div id="project-gallery" className={styles.results} data-project-view={view}>
        {view === "index" ? <ProjectWorkList key={activeCategory} id="project-index" projects={visibleProjects} label="" variant="archive" showArchiveLink={false} />
          : <div className={styles.gallery}>
            {visibleProjects.map((project, index) => <article key={project.slug} className={styles.project} aria-labelledby={"title-" + project.slug}>
              <Link className={styles.artwork} href={"/projects/" + project.slug} onClick={event => navigate(event, project.slug)}>
                <ProjectImage project={project} priority={index === 0} /><span className={styles.imageAction}>Explore project <ArrowUpRight size={17} aria-hidden="true" /></span>
              </Link>
              <div className={styles.meta}><span>{project.group}</span><span>{project.period}</span></div>
              <h2 id={"title-" + project.slug}><Link href={"/projects/" + project.slug} onClick={event => navigate(event, project.slug)}>{project.title}<ArrowUpRight size={26} aria-hidden="true" /></Link></h2>
              <p className={styles.description}>{project.description}</p>
              <ProjectMetric metric={project.metric} />
              <ul className={styles.technologies} aria-label={project.title + " technologies"}>{project.stack.split(/\s*·\s*/).map(tool => <li key={tool}>{tool}</li>)}</ul>
              <div className={styles.actions}>
                <PortfolioButton size="small" variant="secondary" href={"/projects/" + project.slug} onClick={event => navigate(event, project.slug)}>Explore project <ArrowUpRight size={16} aria-hidden="true" /></PortfolioButton>
                {project.sourceAvailable === false ? <Link className={styles.textLink} href="/#contact">Discuss project <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  : <a className={styles.textLink} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={project.title + " on GitHub"}><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>}
              </div>
            </article>)}
            {!visibleProjects.length && <p className={styles.empty}>Projects will appear here when published.</p>}
          </div>}
      </div>
      <div className={styles.closing}>
        <p>{site.projects.closingPrompt}</p>
        <PortfolioButton href="/#contact" size="large">{site.projects.closingLabel}<ArrowUpRight size={24} aria-hidden="true" /></PortfolioButton>
      </div>
    </div>
  </section>;
}

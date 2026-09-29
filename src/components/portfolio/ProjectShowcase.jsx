"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ProjectShowcase.module.css";

function FloatingPreview({ project, index, progress }) {
  const y = useTransform(progress, [0, 1], index % 2 === 0 ? ["72svh", "-94svh"] : ["108svh", "-62svh"]);
  return (
    <motion.div className={styles.preview} data-side={index % 2 === 0 ? "left" : "right"} style={{ y }}>
      <div className={styles.previewImage}>
        <Image src={project.cover.src} alt="" fill sizes="36vw" />
      </div>
      <span>{project.title}</span>
    </motion.div>
  );
}

function ProjectIntroduction({ projects, site, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.2]);

  return (
    <div ref={ref} className={styles.introduction}>
      <div className={styles.stage}>
        <motion.div className={styles.introCopy} style={{ opacity: reducedMotion ? 1 : opacity }}>
          <h2 id="projects-heading">{site.projects.heading}</h2>
          <div className={styles.statement}>
            <p>{site.projects.archiveIntro}</p>
            <a className={styles.exploreLink} href="#selected-projects">{site.projects.archiveExploreLabel} <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </motion.div>
        {!reducedMotion && <div className={styles.previews} aria-hidden="true">
          {projects.slice(0, 2).map((project, index) => <FloatingPreview key={project.slug} project={project} index={index} progress={scrollYProgress} />)}
        </div>}
      </div>
    </div>
  );
}

function SelectedProject({ project, index, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [54, -54]);
  const detailY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const cover = project.gallery.find((image) => image.src === project.cover.src) || project.gallery[0];
  const detail = project.gallery.find((image) => image.src !== project.cover.src && image.kind === "screenshot");

  return (
    <article ref={ref} className={styles.project} data-reversed={index % 2 === 1} aria-labelledby={`${project.slug}-title`}>
      <motion.figure className={styles.visual} style={{ y: reducedMotion ? 0 : y }}>
        <Link className={styles.artwork} href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>
          <Image src={project.cover.src} alt={project.cover.alt} width={cover.width} height={cover.height}
            sizes="(max-width: 767px) 92vw, 60vw" />
          <span className={styles.open}><ArrowUpRight size={25} aria-hidden="true" /></span>
        </Link>
        {detail && <motion.div className={styles.detail} style={{ y: reducedMotion ? 0 : detailY }} aria-hidden="true">
          <Image src={detail.src} alt="" width={detail.width} height={detail.height} sizes="(max-width: 767px) 45vw, 25vw" />
        </motion.div>}
        <figcaption>{project.cover.caption}</figcaption>
      </motion.figure>
      <div className={styles.copy}>
        <div className={styles.meta}><span>{project.group}</span><span>{project.period}</span></div>
        <h3 id={`${project.slug}-title`}>{project.title}</h3>
        <p>{project.description}</p>
        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {project.stack.split(/\s*·\s*/).map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <Link className={styles.projectLink} href={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>
          View Project <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  const { projects, site } = usePortfolioContent();
  const reducedMotion = useMotionPreference();
  const featured = projects.filter((project) => project.featured);
  const selectedWork = (featured.length ? featured : projects.slice(0, 2)).slice(0, 4);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <ProjectIntroduction projects={selectedWork} site={site} reducedMotion={reducedMotion} />
      <div id="selected-projects" className={styles.inner}>
        {selectedWork.map((project, index) => <SelectedProject key={project.slug} project={project} index={index} reducedMotion={reducedMotion} />)}
        <div className={styles.closing}>
          <Link className={styles.archiveLink} href="/projects">{site.projects.archiveLabel} <ArrowUpRight size={32} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ProjectShowcase.module.css";

function FloatingPreview({ image, index, count, progress }) {
  const delay = index / Math.max(1, count) * 0.35;
  const y = useTransform(progress, [0, 1], [`${80 + delay * 160}svh`, `${-110 + delay * 80}svh`]);
  return (
    <motion.div className={styles.preview} data-work-preview data-side={index % 2 === 0 ? "left" : "right"} style={{ y }}>
      <div className={styles.previewImage}>
        <Image src={image.src} alt="" fill sizes="(max-width: 767px) 38vw, 27vw" />
      </div>
      <span>{image.title}</span>
    </motion.div>
  );
}

function RevealWord({ word, index, count, progress, reducedMotion }) {
  const start = 0.06 + index / count * 0.58;
  const color = useTransform(progress, [start, start + 0.16], ["#77786f", "#ffffff"]);
  return <motion.span data-work-word style={{ color: reducedMotion ? "#ffffff" : color }}>{word}{" "}</motion.span>;
}

function ProjectIntroduction({ projects, selectedWork, site, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = site.projects.archiveIntro.split(/\s+/);
  const configured = site.projects.introImages;
  const images = Array.isArray(configured)
    ? configured.flatMap((entry) => {
      const project = projects.find((item) => item.slug === entry.projectSlug);
      const image = project?.gallery.find((item) => item.src === entry.src);
      return image ? [{ ...image, title: image.title || project.title }] : [];
    })
    : selectedWork.slice(0, 2).map((project) => ({ ...project.cover, title: project.title }));

  return (
    <div ref={ref} className={styles.introduction} data-work-introduction>
      <div className={styles.stage}>
        <div className={styles.introCopy}>
          <h2 id="projects-heading">{site.projects.heading}</h2>
          <div className={styles.statement}>
            <p aria-label={site.projects.archiveIntro}><span aria-hidden="true">{words.map((word, index) => <RevealWord key={`${index}-${word}`} word={word} index={index} count={words.length} progress={scrollYProgress} reducedMotion={reducedMotion} />)}</span></p>
            <a className={styles.exploreLink} href="#selected-projects">{site.projects.archiveExploreLabel} <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </div>
        {!reducedMotion && <div className={styles.previews} aria-hidden="true">
          {images.map((image, index) => <FloatingPreview key={`${image.src}-${index}`} image={image} index={index} count={images.length} progress={scrollYProgress} />)}
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
  const published = projects.filter((project) => project.published !== false);
  const featured = published.filter((project) => project.featured);
  const selectedWork = (featured.length ? featured : published.slice(0, 2)).slice(0, 4);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <ProjectIntroduction projects={published} selectedWork={selectedWork} site={site} reducedMotion={reducedMotion} />
      <div id="selected-projects" className={styles.inner}>
        {selectedWork.map((project, index) => <SelectedProject key={project.slug} project={project} index={index} reducedMotion={reducedMotion} />)}
        <div className={styles.closing}>
          <Link className={styles.archiveLink} href="/projects">{site.projects.archiveLabel} <ArrowUpRight size={32} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

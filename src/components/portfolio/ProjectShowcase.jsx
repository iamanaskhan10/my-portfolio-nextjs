"use client";

import SectionHeading from "./SectionHeading";


import PortfolioButton from "./PortfolioButton";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import ProjectEditorialGallery from "./ProjectEditorialGallery";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./ProjectShowcase.module.css";

function FloatingPreview({ image, index, count, progress }) {
  const span = 1 + Math.max(0, count - 1) * 0.42;
  const start = 0.04 + index * 0.42 / span * 0.9;
  const end = 0.04 + (index * 0.42 + 1) / span * 0.9;
  const y = useTransform(progress, [start, end], ["100svh", "-50svh"]);
  return (
    <motion.div className={styles.preview} data-work-preview data-side={index % 2 === 0 ? "left" : "right"} style={{ y }}>
      <div className={styles.previewImage}>
        <Image src={image.src} alt="" fill sizes="(max-width: 767px) 38vw, 27vw" />
      </div>
      <span>{image.title}</span>
    </motion.div>
  );
}

function RevealWord({ word, offset, total, progress, reducedMotion }) {
  const start = 0.08 + offset / total * 0.72;
  const end = 0.08 + (offset + word.length) / total * 0.72;
  const clipPath = useTransform(progress, [start, end], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return <><span className={styles.revealWord} data-work-word style={reducedMotion ? { color: "#ffffff" } : undefined}>{word}<motion.span className={styles.wordFill} data-work-word-fill style={{ clipPath: reducedMotion ? "none" : clipPath }}>{word}</motion.span></span>{" "}</>;
}

function ProjectIntroduction({ projects, selectedWork, site, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = site.projects.archiveIntro.trim().split(/\s+/);
  const total = Math.max(1, words.join(" ").length);
  let offset = 0;
  const configured = site.projects.introImages;
  const images = Array.isArray(configured)
    ? configured.flatMap((entry) => {
      if (!entry.projectSlug) return [{ src: entry.src, title: entry.title || "" }];
      const project = projects.find((item) => item.slug === entry.projectSlug);
      const image = project?.gallery.find((item) => item.src === entry.src);
      return image ? [{ ...image, title: image.title || project.title }] : [];
    })
    : selectedWork.slice(0, 2).map((project) => ({ ...project.cover, title: project.title }));

  return (
    <div ref={ref} className={styles.introduction} data-work-introduction style={{ "--intro-travel": `${220 + Math.max(0, images.length - 2) * 45}svh` }}>
      <div className={styles.stage}>
        <div className={styles.introCopy}>
          <SectionHeading id="projects-heading">{site.projects.heading}</SectionHeading>
          <div className={styles.statement}>
            <p aria-label={site.projects.archiveIntro}><span aria-hidden="true">{words.map((word, index) => {
              const wordOffset = offset;
              offset += word.length + 1;
              return <RevealWord key={`${index}-${word}`} word={word} offset={wordOffset} total={total} progress={scrollYProgress} reducedMotion={reducedMotion} />;
            })}</span></p>
            <PortfolioButton className={styles.exploreLink} href="#selected-projects">{site.projects.archiveExploreLabel} <ArrowDown size={18} aria-hidden="true" /></PortfolioButton>
          </div>
        </div>
        {!reducedMotion && <div className={styles.previews} aria-hidden="true">
          {images.map((image, index) => <FloatingPreview key={`${image.src}-${index}`} image={image} index={index} count={images.length} progress={scrollYProgress} />)}
        </div>}
      </div>
    </div>
  );
}

export function SelectedProject({ project, index, reducedMotion }) {
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
      <ProjectEditorialGallery projects={[...featured, ...published.filter((project) => !project.featured)]} archiveLabel={site.projects.archiveLabel} />
    </section>
  );
}

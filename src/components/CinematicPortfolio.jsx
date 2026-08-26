"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import PortfolioContactForm from "./portfolio/PortfolioContactForm";
import ProjectGrid from "./portfolio/ProjectGrid";
import { chapterVisuals, experiences as resumeExperiences, outcomes, profile, projects, skills } from "../data/portfolio";

function Scene({ id, className = "", progress, range, active, initial = false, linger = false, children }) {
  const opacity = useTransform(progress, range, initial ? [1, 1, 1, 0] : linger ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, range, initial ? [0, 0, 0, -28] : linger ? [28, 0, 0, 0] : [28, 0, 0, -28]);
  const blur = useTransform(progress, range, initial ? [0, 0, 0, 9] : linger ? [9, 0, 0, 0] : [9, 0, 0, 9]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.section
      id={id}
      className={`engineering-scene ${active ? "engineering-scene--active" : ""} ${className}`}
      style={{ opacity, y, filter }}
    >
      {children}
    </motion.section>
  );
}

export default function CinematicPortfolio() {
  const storyRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState("hero");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const chapter =
      latest < 0.17
        ? "hero"
        : latest < 0.34
          ? "about"
          : latest < 0.62
            ? "projects"
            : latest < 0.81
              ? "experience"
              : "contact";

    setActiveChapter((current) => (current === chapter ? current : chapter));
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="engineering-story" ref={storyRef}>
      <div className="engineering-stage">
        <div className="engineering-stage__frame" aria-hidden="true" />
        <div className="engineering-stage__rail engineering-stage__rail--top" aria-hidden="true" />
        <div className="engineering-stage__rail engineering-stage__rail--bottom" aria-hidden="true" />
        <Scene
          id="home"
          className="engineering-scene--hero"
          progress={scrollYProgress}
          range={[0, 0.035, 0.125, 0.18]}
          active={activeChapter === "hero"}
          initial
        >
          <p className="engineering-identity">
            <motion.span
              className="engineering-identity__name"
              animate={reduceMotion ? { x: 0, rotate: 0 } : { x: [0, -0.6, 0.8, -0.35, 0], rotate: [0, -0.8, 0.8, -0.35, 0] }}
              transition={{ duration: 0.38, repeat: reduceMotion ? 0 : Infinity, repeatDelay: 8, ease: "easeInOut" }}
            >
              Anas Khan
            </motion.span>
            <span>Software Engineer</span>
          </p>
          <h1>Software engineering, built to hold up.</h1>
          <p className="engineering-copy engineering-copy--lead">
            I build full-stack platforms, AI products, and reliable systems — from the first product decision through production deployment.
          </p>
          <div className="engineering-actions">
            <a
              href={profile.resume}
              download
              className="engineering-button engineering-button--solid"
              tabIndex={activeChapter === "hero" ? 0 : -1}
            >
              Download resume <Download size={16} aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="engineering-button engineering-button--quiet"
              tabIndex={activeChapter === "hero" ? 0 : -1}
            >
              See selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </Scene>

        <Scene
          id="about"
          className="engineering-scene--about"
          progress={scrollYProgress}
          range={[0.13, 0.19, 0.285, 0.35]}
          active={activeChapter === "about"}
        >
          <h2>Engineering that holds up in production.</h2>
          <p className="engineering-copy">
            B.S. Software Engineering, FAST-NUCES Lahore (2022–2026). I work across full-stack applications, RAG systems, computer vision, and cloud deployment.
          </p>
          <p className="engineering-copy engineering-copy--muted">
            The through line is clear architecture, useful interfaces, and evidence-led engineering decisions.
          </p>
        </Scene>

        <Scene
          id="hero-visual"
          className="engineering-scene--side-visual engineering-scene--side-visual-hero"
          progress={scrollYProgress}
          range={[0, 0.035, 0.125, 0.18]}
          active={activeChapter === "hero"}
          initial
        >
          <figure className="engineering-side-visual">
            <img src={chapterVisuals.hero.image} alt={chapterVisuals.hero.alt} />
          </figure>
        </Scene>

        <Scene
          id="about-visual"
          className="engineering-scene--side-visual engineering-scene--side-visual-about"
          progress={scrollYProgress}
          range={[0.13, 0.19, 0.285, 0.35]}
          active={activeChapter === "about"}
        >
          <figure className="engineering-side-visual">
            <img src={chapterVisuals.about.image} alt={chapterVisuals.about.alt} />
          </figure>
        </Scene>

        <Scene
          id="projects"
          className="engineering-scene--projects"
          progress={scrollYProgress}
          range={[0.3, 0.36, 0.57, 0.65]}
          active={activeChapter === "projects"}
        >
          <div className="engineering-projects__intro">
            <h2>Selected work, viewed together.</h2>
            <p>
              AI platforms, market analysis, CMS infrastructure, and multi-role services — presented as one body of work.
            </p>
            <Link
              href="/projects"
              className="engineering-text-link"
              tabIndex={activeChapter === "projects" ? 0 : -1}
            >
              Explore all projects <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ProjectGrid active={activeChapter === "projects"} />
        </Scene>

        <Scene
          id="experience-visual"
          className="engineering-scene--side-visual engineering-scene--side-visual-experience"
          progress={scrollYProgress}
          range={[0.59, 0.66, 0.76, 0.83]}
          active={activeChapter === "experience"}
        >
          <figure className="engineering-side-visual">
            <img src={chapterVisuals.experience.image} alt={chapterVisuals.experience.alt} />
          </figure>
        </Scene>

        <Scene
          id="experience"
          className="engineering-scene--experience"
          progress={scrollYProgress}
          range={[0.59, 0.66, 0.76, 0.83]}
          active={activeChapter === "experience"}
        >
          <h2>Experience built around delivery.</h2>
          <div className="engineering-timeline">
            {resumeExperiences.map((experience) => (
              <article key={`${experience.role}-${experience.company}`} className="engineering-timeline__item">
                <div>
                  <h3>{experience.role}</h3>
                  <p>{experience.company}</p>
                </div>
                <time>{experience.duration}</time>
              </article>
            ))}
          </div>
          <p className="engineering-copy engineering-copy--muted">
            At Tecaudex and in freelance work, I have delivered features, solved production issues, improved performance, and supported deployment.
          </p>
        </Scene>

        <Scene
          id="achievements"
          className="engineering-scene--foundations"
          progress={scrollYProgress}
          range={[0.73, 0.79, 0.87, 0.92]}
          active={activeChapter === "experience"}
        >
          <h2>Depth where it changes the result.</h2>
          <p className="engineering-skills">{skills.join(" · ")}</p>
          <ul className="engineering-achievements">
            {outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </Scene>

        <Scene
          id="contact"
          className="engineering-scene--contact"
          progress={scrollYProgress}
          range={[0.86, 0.91, 0.99, 1]}
          linger
          active={activeChapter === "contact"}
        >
          <div>
            <h2>Have a problem worth solving?</h2>
            <p className="engineering-copy">
              I’m open to work where strong product thinking, full-stack engineering, or applied AI can create a meaningful improvement.
            </p>
            <div className="engineering-contact-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={activeChapter === "contact" ? 0 : -1}
              >
                <Github size={17} aria-hidden="true" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={activeChapter === "contact" ? 0 : -1}
              >
                <Linkedin size={17} aria-hidden="true" /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} tabIndex={activeChapter === "contact" ? 0 : -1}>
                <Mail size={17} aria-hidden="true" /> Email
              </a>
            </div>
          </div>
          <PortfolioContactForm active={activeChapter === "contact"} />
        </Scene>

        <div className="engineering-progress" aria-hidden="true">
          <motion.span style={{ width: progressWidth }} />
        </div>
      </div>
    </div>
  );
}

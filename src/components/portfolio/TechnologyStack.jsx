"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useInView, useMotionValue, useSpring } from "framer-motion";
import { Database, Layers3, Network, ScanEye } from "lucide-react";
import { DiJava } from "react-icons/di";
import {
  SiAmazonwebservices, SiCss3, SiDocker, SiExpress, SiFastapi, SiGithub,
  SiHtml5, SiHuggingface, SiJavascript, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiPython, SiReact, SiRubyonrails,
  SiSocketdotio, SiTailwindcss, SiTypescript, SiUnity,
} from "react-icons/si";
import { technologies, technologyCategories } from "../../data/technologies";
import useMotionPreference from "../../hooks/useMotionPreference";
import styles from "./TechnologyStack.module.css";

const icons = {
  typescript: SiTypescript,
  javascript: SiJavascript, react: SiReact, next: SiNextdotjs, python: SiPython,
  node: SiNodedotjs, tailwind: SiTailwindcss, fastapi: SiFastapi, rails: SiRubyonrails,
  postgres: SiPostgresql, docker: SiDocker, java: DiJava, html: SiHtml5,
  css: SiCss3, sql: Database, aws: SiAmazonwebservices, express: SiExpress,
  mongo: SiMongodb, mysql: SiMysql, socket: SiSocketdotio, vector: Network,
  rag: Layers3, yolo: ScanEye, transformers: SiHuggingface, github: SiGithub, unity: SiUnity,
};

// Deterministic trajectories keep server rendering stable. Damped springs give
// each icon weight as it descends from a different point in the scene.
const arrivals = {
  arriving: (index) => ({
    opacity: 0,
    x: ((index * 73) % 280) - 140,
    y: -160 - ((index * 37) % 140),
    z: ((index * 53) % 440) - 220,
    rotateX: 20 + ((index * 7) % 25),
    rotateY: ((index * 29) % 70) - 35,
    rotateZ: ((index * 13) % 24) - 12,
    scale: 0.78,
  }),
  settled: (index) => ({
    opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1,
    transition: {
      type: "spring", stiffness: 72, damping: 16, mass: 1,
      delay: Math.min(index * 0.015, 0.3),
      opacity: { duration: 0.3, delay: Math.min(index * 0.015, 0.3) },
    },
  }),
};

function TechnologyTile({ technology, index, controls, hasEntered, active, showDetail, dismissDetail, motionEnabled }) {
  const [hovered, setHovered] = useState(false);
  const detailTimer = useRef(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const height = useMotionValue(0);
  const depth = useMotionValue(0);
  const spring = { stiffness: 180, damping: 20, mass: 0.7 };
  const rotateX = useSpring(tiltX, spring);
  const rotateY = useSpring(tiltY, spring);
  const y = useSpring(height, spring);
  const z = useSpring(depth, spring);
  const Icon = icons[technology.icon];
  const open = active?.name === technology.name;
  const detailId = `technology-detail-${technology.icon}`;

  const cancelDetail = () => {
    clearTimeout(detailTimer.current);
    detailTimer.current = null;
  };

  useEffect(() => () => clearTimeout(detailTimer.current), []);

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    height.set(0);
    depth.set(0);
  };

  useEffect(() => {
    if (motionEnabled) return;
    tiltX.set(0);
    tiltY.set(0);
    height.set(0);
    depth.set(0);
  }, [motionEnabled, tiltX, tiltY, height, depth]);

  const followPointer = (event) => {
    if (!motionEnabled || event.pointerType !== "mouse") return;
    // Measure the stationary grid cell so moving the card cannot create jitter.
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const vertical = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    tiltX.set(5 - vertical * 18);
    tiltY.set(-4 + horizontal * 22);
    height.set(-10);
    depth.set(30);
  };

  return (
    <motion.li custom={index} variants={arrivals} initial={hasEntered ? "settled" : "arriving"} animate={controls}
      className={styles.tile} data-technology={technology.name} data-open={open} data-hovered={hovered && motionEnabled}
      style={{ "--tech-color": technology.color, zIndex: open || hovered ? 2 : 0 }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        setHovered(true);
        cancelDetail();
        const tile = event.currentTarget;
        detailTimer.current = setTimeout(() => {
          detailTimer.current = null;
          if (tile.isConnected && tile.matches(":hover") && !document.hidden) {
            showDetail(tile, technology.name);
          }
        }, 3000);
        followPointer(event);
      }}
      onPointerMove={followPointer}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelDetail();
        setHovered(false);
        resetTilt();
        dismissDetail();
      }}>
      <motion.button type="button" className={styles.card} aria-describedby={detailId}
        style={{ rotateX, rotateY, y, z }}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) {
            cancelDetail();
            showDetail(event.currentTarget, technology.name);
          }
          if (motionEnabled) { height.set(-8); depth.set(24); tiltX.set(5); }
        }}
        onBlur={() => { cancelDetail(); resetTilt(); dismissDetail(); }}
        onClick={(event) => { cancelDetail(); showDetail(event.currentTarget, technology.name); }}>
        <span className={styles.iconWell}><Icon className={styles.icon} aria-hidden="true" /></span>
        <span className={styles.technologyName}>{technology.name}</span>
      </motion.button>
      <div id={detailId} role="tooltip" className={styles.tooltip} hidden={!open} data-below={active?.below}>
        <p>{technology.name} — {technology.detail}</p>
      </div>
    </motion.li>
  );
}

export default function TechnologyStack() {
  const [category, setCategory] = useState(technologyCategories[0]);
  const [active, setActive] = useState(null);
  const [pageVisible, setPageVisible] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const stageRef = useRef(null);
  const entered = useRef(false);
  const inView = useInView(stageRef, { amount: "some", once: true, margin: "0px 0px 100px 0px" });
  const visible = useInView(stageRef, { amount: "some" });
  const reducedMotion = useMotionPreference(null);
  const controls = useAnimationControls();
  const visibleTechnologies = technologies.filter((technology) => category === "Core Stack" ? technology.core : technology.categories.includes(category));

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!active) return;
    const dismissOnEscape = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    const dismissOutside = (event) => {
      if (!event.target.closest("[data-technology]")) setActive(null);
    };
    document.addEventListener("keydown", dismissOnEscape);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      document.removeEventListener("keydown", dismissOnEscape);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, [active]);

  useEffect(() => {
    if (reducedMotion === null) return;
    const settle = () => {
      controls.stop();
      controls.set({ opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
    };
    if (reducedMotion) {
      settle();
      entered.current = true;
      setHasEntered(true);
      return;
    }
    if (!pageVisible) {
      if (entered.current) settle();
      return;
    }
    if (!inView || entered.current) return;
    entered.current = true;
    setHasEntered(true);
    controls.start("settled");
  }, [inView, reducedMotion, pageVisible, controls]);

  const showDetail = (element, name) => {
    setActive({ name, below: element.getBoundingClientRect().top < 220 });
  };

  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-heading">
      <noscript><style>{"#technology-grid > li { opacity: 1 !important; transform: none !important; }"}</style></noscript>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="capabilities-heading">Technologies<br /><span>I build with.</span></h2>
          <p>From interface to infrastructure — tools I use to ship full-stack and AI products.</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filter technologies">
            {technologyCategories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} aria-controls="technology-grid"
                onClick={() => { setCategory(item); setActive(null); }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div ref={stageRef} className={styles.stage}>
          <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={category} id="technology-grid" className={styles.grid} aria-label={`${category} toolkit`} inert={reducedMotion !== null && !hasEntered}
            initial={hasEntered && !reducedMotion ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}>
            {visibleTechnologies.map((technology, index) => (
              <TechnologyTile key={technology.name} technology={technology} index={index} controls={controls} hasEntered={hasEntered}
                active={active} showDetail={showDetail} dismissDetail={() => setActive(null)}
                motionEnabled={visible && pageVisible && !reducedMotion} />
            ))}
          </motion.ul>
          </AnimatePresence>
        </div>
        <p className={styles.filterStatus} role="status">{category} · {visibleTechnologies.length} technologies</p>
      </div>
    </section>
  );
}

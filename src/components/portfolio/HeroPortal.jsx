"use client";

import { useCallback, useId, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import useGsapScene from "../../hooks/useGsapScene";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import IdentityDisplayFaces, { buildIdentityMoments } from "./IdentityDisplayFaces";
import ProjectOrbit from "./ProjectOrbit";
import { createParticlePortal } from "../../lib/animation/createParticlePortal";
import styles from "./HeroPortal.module.css";

const opening = "M0,-15.0888Q0,0 15.0888,0Q0,0 0,15.0888Q0,0 -15.0888,0Q0,0 0,-15.0888Z";
const mask = `M-100000,-100000H100000V100000H-100000Z${opening}`;
const REVEAL = 0.7;

/** One live hero, with a decorative aperture in front of it. Native scrolling
 * and CSS sticky own layout; GSAP owns only the scene's visual wrappers. */
export default function HeroPortal({ children, sceneRef }) {
  const { projects, site, profile, experiences } = usePortfolioContent();
  const selectedProjects = useMemo(() => projects.filter((project) => project.published !== false), [projects]);
  const moments = useMemo(() => buildIdentityMoments({ profile, site, experiences, projects: selectedProjects }), [profile, site, experiences, selectedProjects]);
  const rigRef = useRef(null);
  const planeRef = useRef(null);
  const heroSurfaceRef = useRef(null);
  const wordBandRef = useRef(null);
  const displayControlsRef = useRef(null);
  const apertureRef = useRef(null);
  const veilRef = useRef(null);
  const glowRef = useRef(null);
  const backdropRef = useRef(null);
  const darkRef = useRef(null);
  const controlsRef = useRef(null);
  const skipRef = useRef(null);
  const orbitRef = useRef(null);
  const transitionRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const glowId = useId();

  const setup = useCallback(({ gsap, ScrollTrigger }) => {
    const root = sceneRef.current;
    const plane = planeRef.current;
    const heroSurface = heroSurfaceRef.current;
    const heroContent = heroSurface.firstElementChild;
    const rig = rigRef.current;
    const cubeSkin = rig.querySelector("[data-cube-skin]");
    const shellFaces = [...cubeSkin.children];
    // A direct section URL is a request for content, not the opening sequence.
    if (window.location.hash && window.location.hash !== "#home") {
      delete root.dataset.heroEntrance;
      return;
    }

    let disposed = false;
    let distance = 0;
    let measuredWidth = 0;
    let measuredHeight = 0;
    let viewHeight = 0;
    let trigger;
    let autoplay;
    let introReady = false;
    let focusFrame;
    let activeFace;
    let activeMode;
    let lastWidth;
    let lastDepth;
    let lastHeight;
    let particleRenderer;
    const shape = { fold: 0 };
    const particles = { progress: 0 };
    const flight = { position: 0, reveal: 0 };
    const faces = [...rig.querySelectorAll("[data-identity-face]")];
    const orbit = orbitRef.current;
    const camera = orbit.querySelector("[data-orbit-camera]");
    const cards = [...orbit.querySelectorAll("[data-orbit-card]")];
    const clusters = [...orbit.querySelectorAll("[data-orbit-cluster]")];
    const satellites = clusters.map((cluster) => [...cluster.querySelectorAll("[data-orbit-satellite]")]);
    const galleryBackground = orbit.querySelector("[data-orbit-background]");
    const galleryHeading = orbit.querySelector("h2");
    const particleMark = transitionRef.current.querySelector("svg");
    const projectCount = selectedProjects.length;
    const momentCount = moments.length;
    const boxEnd = 1.5 + (momentCount - 1) * 0.5;
    const galleryStart = boxEnd + 0.75;
    const duration = projectCount ? galleryStart + 0.4 + Math.max(0, projectCount - 1) * 0.5 : boxEnd + 0.2;
    const faceButtons = [...displayControlsRef.current.querySelectorAll("[data-face-button]")];
    const projectButtons = [...displayControlsRef.current.querySelectorAll("[data-project-button]")];
    const entranceAnimations = plane.getAnimations({ subtree: true }).filter((animation) => animation instanceof CSSAnimation);
    entranceAnimations.forEach((animation) => { animation.pause(); animation.currentTime = 0; });
    root.dataset.heroEntrance = "waiting";
    const finishEntrance = () => {
      entranceAnimations.forEach((animation) => { if (animation.playState !== "idle") animation.finish(); });
      root.dataset.heroEntrance = "complete";
    };
    const apertureElement = apertureRef.current;
    const glowElement = glowRef.current;
    const aperture = { approach: 0, rotation: -14, light: 0 };
    const renderAperture = () => {
      // Constant perceptual zoom, without separate camera segments or a
      // WebGL shader compilation/surface swap in the middle of the opening.
      const scale = Math.pow(8 / 0.015, aperture.approach) * viewHeight / Math.max(measuredWidth, viewHeight);
      // SVG uses downwards Y; the WebGL camera uses upwards Y.
      apertureElement.setAttribute("transform", `rotate(${-aperture.rotation}) scale(${scale})`);
      glowElement.style.opacity = aperture.light;
    };
    const compact = () => root.clientWidth < 768 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const centerShift = () => (viewHeight - measuredHeight) / 2;
    const faceWidth = () => Math.min(viewHeight * 0.56, measuredWidth * 0.72, 600);
    const flightX = (position) => Math.sin(position * 1.8) * measuredWidth * 0.36;
    const flightY = (position) => Math.cos(position * 1.3) * viewHeight * 0.12;
    gsap.set(camera, { x: 0, y: 0, z: 0 });
    const moveCameraX = gsap.quickSetter(camera, "x", "px");
    const moveCameraY = gsap.quickSetter(camera, "y", "px");
    const moveCameraZ = gsap.quickSetter(camera, "z", "px");
    const renderGallery = () => {
      moveCameraX(-flightX(flight.position));
      moveCameraY(-flightY(flight.position));
      moveCameraZ(flight.position * 1000);
      clusters.forEach((cluster, index) => {
        const distance = index - flight.position;
        const visible = flight.reveal > 0 && distance > -0.56 && distance < 2.1;
        cluster.style.display = visible ? "block" : "none";
        if (!visible) return;
        const opacity = distance < -0.1 ? Math.max(0, 1 + (distance + 0.1) / 0.46) : Math.min(1, (2.1 - distance) / 0.6);
        cards[index].style.opacity = opacity * flight.reveal;
        satellites[index].forEach((image) => { image.style.opacity = opacity * flight.reveal * 0.7; });
      });
    };
    const renderShape = () => {
      const width = (measuredWidth + (faceWidth() - measuredWidth) * shape.fold).toFixed(2);
      const depth = (faceWidth() * shape.fold).toFixed(2);
      const height = (measuredHeight + (faceWidth() - measuredHeight) * shape.fold).toFixed(2);
      if (width !== lastWidth) { rig.style.setProperty("--display-width", `${width}px`); lastWidth = width; }
      if (height !== lastHeight) { rig.style.setProperty("--display-height", `${height}px`); lastHeight = height; }
      if (depth !== lastDepth) {
        rig.style.setProperty("--display-depth", `${depth}px`);
        lastDepth = depth;
      }
      const fit = Math.min(faceWidth() / measuredWidth, faceWidth() / measuredHeight);
      const scale = 1 + (fit - 1) * shape.fold;
      heroSurface.style.transform = `translate(${(Number(width) - measuredWidth * scale) / 2}px, ${(Number(height) - measuredHeight * scale) / 2}px) scale(${scale})`;
    };
    const selectVisibleFace = (index, mode) => {
      if (index === activeFace && mode === activeMode) return;
      activeFace = index;
      activeMode = mode;
      root.dataset.displayActiveFace = String(index);
      // Four physical orientations are reused as CMS moments pass the front.
      // Only neighbouring panels are painted, avoiding coincident faces at N > 4.
      faces.forEach((face, faceIndex) => {
        const visible = mode === "hero" ? faceIndex === 0 : mode === "box" && (momentCount <= 4 || Math.abs(faceIndex - index) <= 1);
        face.style.visibility = visible ? "visible" : "hidden";
        face.inert = !(mode === "hero" && faceIndex === 0) && (mode !== "box" || faceIndex !== index);
        face.setAttribute("aria-hidden", String(face.inert));
      });
      orbit.inert = mode !== "gallery";
      orbit.setAttribute("aria-hidden", String(orbit.inert));
      cards.forEach((card, cardIndex) => {
        card.inert = mode !== "gallery" || cardIndex !== index;
        card.setAttribute("aria-hidden", String(card.inert));
      });
      faceButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
      projectButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
    };
    const measure = () => {
      const height = heroContent.offsetHeight;
      const width = root.clientWidth;
      const viewport = Math.min(height, window.innerHeight);
      if (height === measuredHeight && width === measuredWidth && (compact() || viewport === viewHeight)) return;
      measuredHeight = height;
      measuredWidth = width;
      viewHeight = viewport;
      distance = Math.round(height * (compact() ? 2.1 : 2.6) * (duration - REVEAL));
      root.style.setProperty("--portal-height", `${height}px`);
      root.style.setProperty("--portal-distance", `${distance}px`);
      root.style.setProperty("--portal-view-height", `${viewHeight}px`);
      root.style.setProperty("--portal-width", `${width}px`);
      clusters.forEach((cluster, index) => gsap.set(cluster, { x: flightX(index), y: flightY(index), z: -index * 1000 }));
      satellites.forEach((images) => images.forEach((image, index) => gsap.set(image, {
        x: (index ? 1 : -1) * Math.min(measuredWidth * 0.49, 630),
        y: (index ? 1 : -1) * viewHeight * 0.3, z: index ? 100 : -180,
        rotationY: index ? -12 : 12, rotationZ: index ? 5 : -5, xPercent: -50, yPercent: -50,
      })));
      particleRenderer?.resize(width, viewHeight);
      renderGallery();
      trigger?.refresh();
      renderAperture();
      renderShape();
    };

    measure();
    root.dataset.portalActive = "true";
    root.dataset.portalPhase = "darkness";
    renderAperture();
    gsap.set(rig, { "--display-scale": 0.86, rotationY: -8, xPercent: compact() ? 0 : -10, y: centerShift(), z: -90, pointerEvents: "none" });
    gsap.set(plane, { opacity: 0.3 });
    gsap.set(veilRef.current, { autoAlpha: 1 });
    gsap.set(darkRef.current, { autoAlpha: 1 });
    gsap.set(controlsRef.current, { autoAlpha: 1 });
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(orbit, { visibility: "hidden" });
    gsap.set(galleryBackground, { opacity: 0 });
    gsap.set([galleryHeading, transitionRef.current], { autoAlpha: 0 });
    gsap.set(particleMark, { scale: 0.7 });
    cards.forEach((card, index) => gsap.set(card, {
      yPercent: -50, xPercent: -50, rotationY: index % 2 ? 6 : -6,
    }));
    const tokens = getComputedStyle(root);
    particleRenderer = createParticlePortal(particleCanvasRef.current, {
      signal: tokens.getPropertyValue("--signal").trim(), highlight: tokens.getPropertyValue("--signal-highlight").trim(), compact: compact(),
    });
    particleRenderer?.resize(measuredWidth, viewHeight);
    gsap.set([wordBandRef.current, displayControlsRef.current], { autoAlpha: 0 });
    gsap.set(wordBandRef.current, { xPercent: -30, rotation: -4, y: 30 });
    selectVisibleFace(0, "hero");

    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
      onUpdate: () => {
        const progress = timeline.time();
        if (progress <= 0.66) renderAperture();
        renderShape();
        if (progress >= boxEnd && progress <= galleryStart + 0.1) particleRenderer?.render(particles.progress);
        renderGallery();
        const gallery = projectCount > 0 && progress >= galleryStart;
        const index = gallery ? Math.round(flight.position) : Math.round(-Number(gsap.getProperty(rig, "rotationY")) / 90);
        const mode = gallery ? "gallery" : progress >= 0.82 && progress < boxEnd + 0.25 ? "box" : progress < 0.82 ? "hero" : "transition";
        selectVisibleFace(mode === "hero" ? 0 : Math.max(0, Math.min((gallery ? projectCount : momentCount) - 1, index)), mode);
        const phase = progress < 0.12 ? "darkness" : progress < 0.32 ? "aperture" : progress < 0.66 ? "approach" : progress < 0.82 ? "hero" : progress < 1 ? "plane" : gallery ? "gallery" : progress >= boxEnd ? "transition" : "display";
        if (root.dataset.portalPhase !== phase) root.dataset.portalPhase = phase;
      },
    });
    timeline
      .to(darkRef.current, { autoAlpha: 0, duration: 0.08 }, 0.02)
      .fromTo(aperture, { light: 0 }, { light: 1, duration: 0.16, immediateRender: false }, 0.02)
      .fromTo(aperture, { approach: 0, rotation: -14 }, { approach: 1, rotation: 0, duration: 0.62, immediateRender: false }, 0.02)
      .fromTo(rig, { "--display-scale": 0.86, rotationY: -8, xPercent: () => compact() ? 0 : -10, y: centerShift, z: -90 }, { "--display-scale": 1, rotationY: 0, xPercent: 0, y: 0, z: 0, duration: 0.36, ease: "power1.inOut", immediateRender: false }, 0.28)
      .to(plane, { opacity: 1, duration: 0.36, ease: "power1.inOut" }, 0.28)
      .to(controlsRef.current, { autoAlpha: 0, duration: 0.06 }, 0.58)
      .set(veilRef.current, { autoAlpha: 0 }, 0.66)
      .set(rig, { pointerEvents: "auto" }, 0.66)
      .to(backdropRef.current, { opacity: 1, duration: 0.12 }, 0.82)
      .fromTo(rig, { "--display-scale": 1, rotationX: 0, rotationY: 0, rotationZ: 0, y: 0, z: 0 }, {
        "--display-scale": () => viewHeight < 500 ? 0.78 : 1,
        rotationX: -12,
        rotationY: -20,
        rotationZ: 0,
        z: () => -faceWidth() / 2,
        y: () => (viewHeight - faceWidth()) / 2 - 20,
        duration: 0.5,
        ease: "power1.inOut",
        immediateRender: false,
      }, 0.82);
    timeline.fromTo(shape, { fold: 0 }, { fold: 1, duration: 0.5, ease: "power1.inOut", immediateRender: false }, 0.82)
      .to(wordBandRef.current, { autoAlpha: 1, duration: 0.16 }, 1.06)
      .to(displayControlsRef.current, { autoAlpha: 1, duration: 0.12 }, 1.18)
      .to(wordBandRef.current, { xPercent: -70, rotation: 4, y: -30, duration: boxEnd - 1.06 }, 1.06);
    if (momentCount > 1) timeline.to(rig, { rotationY: -(momentCount - 1) * 90 - 20, duration: (momentCount - 1) * 0.5 }, 1.39);
    if (projectCount) {
      // Opacity on a preserve-3d parent flattens its descendants. Fade only
      // individual surfaces; the rig, geometry and shell stay fully opaque.
      timeline.to([...faces, ...shellFaces, wordBandRef.current, displayControlsRef.current], { opacity: 0, duration: 0.2 }, boxEnd)
        .set(rig, { visibility: "hidden" }, boxEnd + 0.2)
        .set(displayControlsRef.current, { autoAlpha: 0 }, boxEnd + 0.2)
        .set(orbit, { visibility: "visible" }, boxEnd)
        .to(galleryBackground, { opacity: 1, duration: 0.2 }, boxEnd)
        .to(transitionRef.current, { autoAlpha: 1, duration: 0.18 }, boxEnd + 0.06)
        .to(particles, { progress: 1, duration: 0.66 }, boxEnd + 0.06)
        .to(particleMark, { scale: 1.4, rotation: 45, duration: 0.5 }, boxEnd + 0.08)
        .to(transitionRef.current, { autoAlpha: 0, duration: 0.14 }, galleryStart - 0.14)
        .to(flight, { reveal: 1, duration: 0.2 }, galleryStart - 0.2)
        .to(galleryHeading, { autoAlpha: 1, duration: 0.15 }, galleryStart)
        .to(displayControlsRef.current, { autoAlpha: 1, duration: 0.15 }, galleryStart)
        .to(flight, { position: projectCount - 1, duration: Math.max(0.01, (projectCount - 1) * 0.5) }, galleryStart + 0.15);
    }
    timeline.to({}, { duration: 0.01 }, duration - 0.01);
    const finishIntro = (immediate = false) => {
      autoplay?.kill();
      if (!introReady) {
        introReady = true;
        timeline.time(REVEAL);
        root.dataset.heroEntrance = "playing";
        entranceAnimations.forEach((animation) => animation.play());
        Promise.allSettled(entranceAnimations.map((animation) => animation.finished)).then(() => {
          if (!disposed) root.dataset.heroEntrance = "complete";
        });
      }
      if (immediate) finishEntrance();
    };
    const playhead = { time: REVEAL };
    const scrollAnimation = gsap.fromTo(playhead, { time: REVEAL }, {
      time: duration, duration: 1, ease: "none", paused: true,
      onUpdate: () => { if (introReady) timeline.time(playhead.time); },
    });
    trigger = ScrollTrigger.create({
      id: "hero-portal", trigger: root, start: "top top", end: () => `+=${distance}`,
      animation: scrollAnimation, scrub: 0.4,
      onUpdate: (self) => {
        if (!introReady && self.scroll() > self.start + 12) finishIntro(true);
        if (introReady) {
          if (self.progress > 0.025) finishEntrance();
        }
      },
      onRefresh: (self) => {
        if (introReady) timeline.invalidate().time(REVEAL + self.progress * (duration - REVEAL));
      },
      onToggle: ({ isActive }) => { rig.style.willChange = isActive ? "transform" : "auto"; },
    });
    if (window.scrollY > trigger.start + 12) {
      finishIntro(true);
      timeline.time(REVEAL + trigger.progress * (duration - REVEAL));
    } else {
      autoplay = timeline.tweenTo(REVEAL, { duration: 1.9, ease: "none", onComplete: () => finishIntro() });
    }

    const reveal = () => {
      finishIntro(true);
      window.scrollTo({ top: trigger.start, behavior: "instant" });
      timeline.time(REVEAL);
      trigger.update();
      trigger.getTween()?.progress(1);
      scrollAnimation.progress(0);
    };
    const skip = () => {
      reveal();
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => plane.querySelector("a[href]")?.focus({ preventScroll: true }));
    };
    // Keyboard users never land behind the mask. Do not change focus while
    // scrolling, and keep the real content available to assistive technology.
    const revealFocusedContent = () => { if (timeline.time() < 0.66) reveal(); };
    const skipButton = skipRef.current;
    skipButton.addEventListener("click", skip);
    plane.addEventListener("focusin", revealFocusedContent);
    const showFace = (index, gallery) => {
      finishIntro(true);
      const stop = gallery ? galleryStart + 0.15 + index * 0.5 : 1.39 + index * 0.5;
      window.scrollTo({ top: trigger.start + distance * (stop - REVEAL) / (duration - REVEAL), behavior: "instant" });
      trigger.update();
      trigger.getTween()?.progress(1);
      scrollAnimation.progress((stop - REVEAL) / (duration - REVEAL));
    };
    const chooseFace = (event) => {
      const button = event.target.closest("button[data-face-button], button[data-project-button]");
      if (button) showFace(Number(button.dataset.faceButton ?? button.dataset.projectButton), button.hasAttribute("data-project-button"));
    };
    const rotateWithKeyboard = (event) => {
      const buttons = activeMode === "gallery" ? projectButtons : faceButtons;
      const current = buttons.indexOf(event.target);
      if (current < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (current + (event.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length;
      showFace(next, activeMode === "gallery");
      buttons[next].focus({ preventScroll: true });
      buttons[next].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    };
    const displayControls = displayControlsRef.current;
    displayControls.addEventListener("click", chooseFace);
    displayControls.addEventListener("keydown", rotateWithKeyboard);

    const observer = new ResizeObserver(measure);
    observer.observe(heroContent);
    window.addEventListener("resize", measure);
    const images = [...rig.querySelectorAll("img")];
    Promise.allSettled([document.fonts.ready, ...images.map((image) => image.decode())])
      .then(() => { if (!disposed) { measure(); trigger.refresh(); } });

    return () => {
      disposed = true;
      particleRenderer?.dispose();
      autoplay?.kill();
      finishEntrance();
      cancelAnimationFrame(focusFrame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      skipButton.removeEventListener("click", skip);
      plane.removeEventListener("focusin", revealFocusedContent);
      displayControls.removeEventListener("click", chooseFace);
      displayControls.removeEventListener("keydown", rotateWithKeyboard);
      rig.style.removeProperty("will-change");
      ["--display-width", "--display-height", "--display-depth"].forEach((property) => rig.style.removeProperty(property));
      plane.removeAttribute("inert");
      plane.removeAttribute("aria-hidden");
      [...faces.filter((face) => face !== plane), ...cards, orbit].forEach((face) => { face.inert = true; face.setAttribute("aria-hidden", "true"); face.style.removeProperty("visibility"); });
      plane.style.removeProperty("visibility");
      heroSurface.style.removeProperty("transform");
      clusters.forEach((cluster) => cluster.style.removeProperty("display"));
      [...cards, ...satellites.flat()].forEach((card) => card.style.removeProperty("opacity"));
      apertureElement.removeAttribute("transform");
      glowElement.style.removeProperty("opacity");
      root.style.removeProperty("--portal-height");
      root.style.removeProperty("--portal-distance");
      root.style.removeProperty("--portal-view-height");
      root.style.removeProperty("--portal-width");
      delete root.dataset.portalActive;
      delete root.dataset.portalPhase;
      delete root.dataset.displayActiveFace;
      delete root.dataset.heroEntrance;
    };
  }, [sceneRef, selectedProjects, moments]);

  useGsapScene({ scope: sceneRef, setup });

  return (
    <div ref={sceneRef} id="home" className={styles.scene} data-hero-entrance="waiting">
      <noscript><style>{`#home [data-boot-cover] { display: none !important; } #home [data-hero-plane] * { animation-play-state: running !important; }`}</style></noscript>
      <div className={styles.stage}>
        <div className={styles.bootCover} data-boot-cover aria-hidden="true" />
        <div ref={backdropRef} className={styles.backdrop} aria-hidden="true" />
        <p className={styles.displayHeading}>Achievements &amp; identity</p>
        <div ref={wordBandRef} className={styles.wordBand} aria-hidden="true">{["Full-stack", "Applied AI", "Built to ship"].map((phrase) => <span key={phrase}>{phrase}</span>)}</div>
        <div ref={rigRef} className={styles.rig} data-display-rig>
          <div className={styles.geometry}>
          <div className={styles.cubeSkin} data-cube-skin aria-hidden="true">
            {[0, 90, 180, 270].map((angle) => <div key={angle} className={styles.cubeShellFace} style={{ "--face-angle": `${angle}deg` }} />)}
            <div className={`${styles.cubeShellFace} ${styles.cubeTop}`} />
            <div className={`${styles.cubeShellFace} ${styles.cubeBottom}`} />
          </div>
          <div ref={planeRef} className={styles.plane} data-hero-plane data-identity-face="0"><div ref={heroSurfaceRef} className={styles.heroSurface}>{children}</div></div>
          <IdentityDisplayFaces moments={moments} />
          </div>
        </div>
        <div ref={transitionRef} className={styles.galleryTransition} aria-hidden="true"><canvas ref={particleCanvasRef} className={styles.particleCanvas} data-particle-portal /><svg viewBox="-20 -20 40 40"><path d={opening} /></svg></div>
        <div ref={orbitRef} className={styles.orbit} inert aria-hidden="true"><ProjectOrbit projects={selectedProjects} heading={site.projects.heading} /></div>
        <div ref={veilRef} className={styles.aperture} aria-hidden="true">
        <svg className={styles.fallback} viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <radialGradient id={glowId} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="280">
              <stop offset="0" stopColor="var(--signal-highlight)" stopOpacity="0.85" />
              <stop offset="0.28" stopColor="var(--signal)" stopOpacity="0.7" />
              <stop offset="0.65" stopColor="var(--signal-shadow)" stopOpacity="0.35" />
              <stop offset="1" stopColor="var(--signal-shadow)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g ref={apertureRef}>
            <path d={mask} fill="var(--editorial-void)" fillRule="evenodd" />
            <path ref={glowRef} d={mask} fill={`url(#${glowId})`} fillRule="evenodd" />
          </g>
        </svg>
        <div ref={darkRef} className={styles.darkness} />
        </div>
        <div ref={controlsRef} className={styles.controls}>
          <span className={styles.prompt}>{profile.name}</span>
          <button ref={skipRef} type="button" className={styles.skip}>Skip intro <ArrowUpRight size={15} aria-hidden="true" /></button>
        </div>
        <div ref={displayControlsRef} className={styles.displayControls}>
          <div className={`${styles.faceButtons} ${styles.momentButtons}`} role="group" aria-label="Achievements and identity">
            {moments.map((moment, index) => <button key={moment.id} type="button" data-face-button={index} aria-label={`Show ${moment.label}`} aria-pressed={false}><span /></button>)}
          </div>
          <div className={`${styles.faceButtons} ${styles.projectButtons}`} role="group" aria-label="Selected projects">
            {selectedProjects.map((project, index) => <button key={project.slug} type="button" data-project-button={index} aria-label={`Show ${project.title}`} aria-pressed={false}><span /></button>)}
          </div>
          <Link className={styles.archiveLink} href="/projects">{site.projects.archiveLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <a className={styles.continueLink} href="#about">Continue to About <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  );
}

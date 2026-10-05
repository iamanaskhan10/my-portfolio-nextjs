"use client";

import { useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import useGsapScene from "../../hooks/useGsapScene";
import { usePortfolioContent } from "../../context/PortfolioContentContext";
import IdentityDisplayFaces, { buildIdentityMoments } from "./IdentityDisplayFaces";
import { createParticlePortal } from "../../lib/animation/createParticlePortal";
import styles from "./HeroPortal.module.css";

const opening = "M0,-15.0888Q0,0 15.0888,0Q0,0 0,15.0888Q0,0 -15.0888,0Q0,0 0,-15.0888Z";
const REVEAL = 0.7;
const TURN_START = 1.59;
const PANEL_REVEAL = 1.52;

/** One live hero, with a curved opening curtain in front of it. Native scrolling
 * and CSS sticky own layout; GSAP owns only the scene's visual wrappers. */
export default function HeroPortal({ children, sceneRef }) {
  const { projects, site, profile, experiences } = usePortfolioContent();
  const selectedProjects = useMemo(() => projects.filter((project) => project.published !== false), [projects]);
  const moments = useMemo(() => buildIdentityMoments({ profile, site, experiences, projects: selectedProjects }), [profile, site, experiences, selectedProjects]);
  const rigRef = useRef(null);
  const planeRef = useRef(null);
  const heroSurfaceRef = useRef(null);
  const identityPanelRef = useRef(null);
  const wordBandRef = useRef(null);
  const displayControlsRef = useRef(null);
  const curtainPathRef = useRef(null);
  const introLabelRef = useRef(null);
  const veilRef = useRef(null);
  const backdropRef = useRef(null);
  const groundRef = useRef(null);
  const controlsRef = useRef(null);
  const skipRef = useRef(null);
  const transitionRef = useRef(null);
  const particleCanvasRef = useRef(null);

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
    let entranceStarted = false;
    let focusFrame;
    let activeFace;
    let activeMode;
    let lastWidth;
    let lastDepth;
    let lastHeight;
    let lastFold;
    let lastRotation;
    let particleRenderer;
    let identityVisible = false;
    const shape = { fold: 0, rotationY: 0 };
    const particles = { progress: 0 };
    const faces = [...rig.querySelectorAll("[data-identity-face]")];
    const displayHeading = root.querySelector("[data-display-heading]");
    const particleMark = transitionRef.current.querySelector("svg");
    const momentCount = moments.length;
    const boxEnd = TURN_START + 0.11 + (momentCount - 1) * 0.5;
    const galleryStart = boxEnd + 1.1;
    const duration = galleryStart;
    const faceButtons = [...displayControlsRef.current.querySelectorAll("[data-face-button]")];
    const entranceAnimations = plane.getAnimations({ subtree: true }).filter((animation) =>
      animation instanceof CSSAnimation && Number.isFinite(animation.effect.getComputedTiming().endTime));
    entranceAnimations.forEach((animation) => { animation.pause(); animation.currentTime = 0; });
    root.dataset.heroEntrance = "waiting";
    const finishEntrance = () => {
      if (root.dataset.heroEntrance === "complete") return;
      entranceAnimations.forEach((animation) => { if (animation.playState !== "idle") animation.finish(); });
      root.dataset.heroEntrance = "complete";
    };
    const beginEntrance = () => {
      if (entranceStarted || disposed) return;
      entranceStarted = true;
      root.dataset.heroEntrance = "playing";
      entranceAnimations.forEach((animation) => animation.play());
      Promise.allSettled(entranceAnimations.map((animation) => animation.finished)).then(() => {
        if (!disposed) root.dataset.heroEntrance = "complete";
      });
    };
    const curtain = { edge: 1002, curve: 0 };
    const renderCurtain = () => {
      // The center trails the edges, then catches up as the curtain leaves.
      // One quadratic curve stays smooth at every viewport aspect ratio.
      curtainPathRef.current.setAttribute("d", `M0,-4H1000V${curtain.edge}Q500,${curtain.edge + curtain.curve} 0,${curtain.edge}Z`);
    };
    const compact = () => root.clientWidth < 768 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const faceWidth = () => Math.min(viewHeight * 0.4, measuredWidth * 0.62, 420);
    const faceHeight = () => faceWidth() * 1.38;
    const moveRigY = gsap.quickSetter(rig, "y", "px");
    const moveRigZ = gsap.quickSetter(rig, "z", "px");
    const rotateRig = gsap.quickSetter(rig, "rotationY", "deg");
    const renderShape = (force = false) => {
      if (shape.rotationY !== lastRotation) {
        rotateRig(shape.rotationY);
        lastRotation = shape.rotationY;
      }
      // Geometry only changes during the fold or a real resize. Cached setters
      // avoid constructing a tween and reading computed CSS on every frame.
      if (!force && shape.fold === lastFold) return;
      lastFold = shape.fold;
      moveRigY(((viewHeight - faceHeight()) / 2 + 10) * shape.fold);
      moveRigZ(-faceWidth() / 2 * shape.fold);
      rig.style.setProperty("--display-scale", 1 + ((viewHeight < 500 ? 0.7 : viewHeight < 700 ? 0.78 : 1) - 1) * shape.fold);
      const width = (measuredWidth + (faceWidth() - measuredWidth) * shape.fold).toFixed(2);
      const depth = (faceWidth() * shape.fold).toFixed(2);
      const height = (measuredHeight + (faceHeight() - measuredHeight) * shape.fold).toFixed(2);
      if (width !== lastWidth) { rig.style.setProperty("--display-width", `${width}px`); lastWidth = width; }
      if (height !== lastHeight) { rig.style.setProperty("--display-height", `${height}px`); lastHeight = height; }
      if (depth !== lastDepth) {
        rig.style.setProperty("--display-depth", `${depth}px`);
        rig.style.setProperty("--display-gap", `${faceWidth() * 0.09 * shape.fold}px`);
        rig.style.setProperty("--display-radius", `${10 * shape.fold}px`);
        lastDepth = depth;
      }
      // A 90-degree turn swaps the frame's width and height. Size the hero
      // in that unrotated space so its final outline equals the upright panel.
      const frameWidth = measuredWidth + (faceHeight() - measuredWidth) * shape.fold;
      const frameHeight = measuredHeight + (faceWidth() - measuredHeight) * shape.fold;
      plane.style.setProperty("--hero-frame-width", `${frameWidth}px`);
      plane.style.setProperty("--hero-frame-height", `${frameHeight}px`);
      const scale = Math.min(frameWidth / measuredWidth, frameHeight / measuredHeight);
      heroSurface.style.transform = `translate(${(frameWidth - measuredWidth * scale) / 2}px, ${(frameHeight - measuredHeight * scale) / 2}px) scale(${scale})`;
    };
    const selectVisibleFace = (index, mode) => {
      if (index === activeFace && mode === activeMode) return;
      activeFace = index;
      activeMode = mode;
      root.dataset.displayActiveFace = String(index);
      // Four physical orientations are reused as CMS moments pass the front.
      // Keep every physical panel painted, including its mirrored reverse.
      // For longer CMS sequences, reuse each orientation with its nearest moment.
      faces.forEach((face, faceIndex) => {
        const occupant = faces.reduce((nearest, _, candidate) => {
          const delta = Math.abs(candidate - index) - Math.abs(nearest - index);
          return candidate % 4 === faceIndex % 4 && (delta < 0 || (delta === 0 && candidate < nearest)) ? candidate : nearest;
        }, faceIndex);
        const visible = mode === "hero" ? faceIndex === 0 : mode === "box" && faceIndex === occupant;
        face.style.visibility = visible ? "visible" : "hidden";
        face.inert = !(mode === "hero" && faceIndex === 0) && (mode !== "box" || faceIndex !== index);
        face.setAttribute("aria-hidden", String(face.inert));
      });
      faceButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
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
      root.style.setProperty("--display-size", `${faceWidth()}px`);
      root.style.setProperty("--display-panel-height", `${faceHeight()}px`);
      particleRenderer?.resize(width, viewHeight);
      trigger?.refresh();
      renderCurtain();
      renderShape(true);
    };

    measure();
    root.dataset.portalActive = "true";
    root.dataset.portalPhase = "curtain";
    renderCurtain();
    gsap.set(rig, { "--display-scale": 1, rotationY: 0, rotationZ: 0, xPercent: 0, y: 0, z: 0, pointerEvents: "none" });
    gsap.set(cubeSkin, { visibility: "hidden" });
    gsap.set(plane, { opacity: 1 });
    gsap.set(identityPanelRef.current, { autoAlpha: 0 });
    gsap.set(veilRef.current, { autoAlpha: 1 });
    gsap.set(introLabelRef.current, { opacity: 1, y: 0 });
    gsap.set(controlsRef.current, { autoAlpha: 1 });
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(groundRef.current, { opacity: 0, scaleX: 0.65 });
    gsap.set(transitionRef.current, { autoAlpha: 0 });
    gsap.set(particleMark, { scale: 1 });
    const tokens = getComputedStyle(root);
    particleRenderer = createParticlePortal(particleCanvasRef.current, {
      signal: tokens.getPropertyValue("--signal").trim(), highlight: tokens.getPropertyValue("--signal-highlight").trim(), ink: tokens.getPropertyValue("--editorial-void").trim(), compact: compact(),
    });
    particleRenderer?.resize(measuredWidth, viewHeight);
    gsap.set([wordBandRef.current, displayControlsRef.current], { autoAlpha: 0 });
    gsap.set(displayHeading, { autoAlpha: 0 });
    gsap.set(faces.slice(1), { opacity: 0 });
    gsap.set(wordBandRef.current, { xPercent: -20, rotation: 0, y: 0 });
    selectVisibleFace(0, "hero");

    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
      onUpdate: () => {
        const progress = timeline.time();
        renderCurtain();
        // Resolve the hero behind the lifting curtain, before it is exposed.
        if (progress >= 0.1) beginEntrance();
        renderShape();
        const showIdentity = progress >= 1.43;
        if (showIdentity !== identityVisible) {
          identityVisible = showIdentity;
          heroSurface.inert = showIdentity;
          heroSurface.setAttribute("aria-hidden", String(showIdentity));
          identityPanelRef.current.setAttribute("aria-hidden", String(!showIdentity));
        }
        if (progress >= boxEnd && progress <= galleryStart + 0.1) particleRenderer?.render(particles.progress);
        const handoff = progress >= boxEnd + 0.65;
        if (root.dataset.workHandoff !== String(handoff)) root.dataset.workHandoff = String(handoff);
        const index = Math.round(-shape.rotationY / 90);
        // The other faces still have viewport-sized geometry during the fold.
        // Fade them in only after the shared-frame handoff;
        // otherwise their project images flash behind the rolling hero.
        const mode = handoff ? "transition" : progress >= PANEL_REVEAL ? "box" : "hero";
        selectVisibleFace(mode === "hero" ? 0 : Math.max(0, Math.min(momentCount - 1, index)), mode);
        const phase = progress < 0.66 ? "curtain" : progress < 0.82 ? "hero" : progress < 1 ? "plane" : progress >= galleryStart ? "work" : progress >= boxEnd ? "transition" : "display";
        if (root.dataset.portalPhase !== phase) root.dataset.portalPhase = phase;
      },
    });
    timeline
      .to(curtain, { edge: -4, duration: 0.56, ease: "power3.inOut" }, 0.1)
      .to(curtain, { curve: 180, duration: 0.18, ease: "power2.out" }, 0.1)
      .to(curtain, { curve: 0, duration: 0.36, ease: "power2.inOut" }, 0.28)
      .to(introLabelRef.current, { y: -70, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.1)
      .to(controlsRef.current, { autoAlpha: 0, duration: 0.1 }, 0.1)
      .set(veilRef.current, { autoAlpha: 0 }, 0.66)
      .set(rig, { pointerEvents: "auto" }, 0.66)
      .to(backdropRef.current, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 0.82);
    timeline.fromTo(plane, { "--hero-roll": "0deg" }, { "--hero-roll": "90deg", duration: 0.3, ease: "power1.inOut", immediateRender: false }, 0.82)
      .fromTo(shape, { fold: 0 }, { fold: 1, duration: 0.5, ease: "power1.inOut", immediateRender: false }, 0.82)
      // Both surfaces share one exact outline. Keep the hero at 90 degrees
      // and crossfade its content into the counter-rotated, upright panel.
      .to(heroSurface, { opacity: 0, duration: 0.18 }, 1.34)
      .to(identityPanelRef.current, { autoAlpha: 1, duration: 0.18 }, 1.34)
      .fromTo(identityPanelRef.current.querySelectorAll("span"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, stagger: 0.04, ease: "power2.out", immediateRender: false }, 1.34)
      .to(groundRef.current, { opacity: 0.65, scaleX: 1, duration: 0.3, ease: "power1.out" }, 1.02)
      .to(faces.slice(1), { opacity: 1, duration: 0.3, ease: "power1.inOut" }, PANEL_REVEAL)
      .to(wordBandRef.current, { autoAlpha: 1, duration: 0.3, ease: "power1.inOut" }, 1.42)
      .to(displayHeading, { autoAlpha: 1, duration: 0.3, ease: "power1.inOut" }, 1.42)
      .to(displayControlsRef.current, { autoAlpha: 1, duration: 0.3, ease: "power1.inOut" }, PANEL_REVEAL)
      .to(wordBandRef.current, { xPercent: -80, duration: boxEnd - 1.42 }, 1.42);
    if (momentCount > 1) timeline.to(shape, { rotationY: -(momentCount - 1) * 90, duration: (momentCount - 1) * 0.5 }, TURN_START);
    {
      // Opacity on a preserve-3d parent flattens its descendants. Fade only
      // individual surfaces; the rig, geometry and shell stay fully opaque.
      timeline.to([displayControlsRef.current, displayHeading], { autoAlpha: 0, duration: 0.12 }, boxEnd)
        .set(transitionRef.current, { autoAlpha: 1 }, boxEnd)
        .to(particles, { progress: 1, duration: 1.1 }, boxEnd)
        // Keep the panels intact until the emitted star covers the viewport.
        .set([...faces, ...shellFaces, wordBandRef.current, groundRef.current], { opacity: 0 }, boxEnd + 0.65)
        .set(rig, { visibility: "hidden" }, boxEnd + 0.65)
        .set(backdropRef.current, { opacity: 0 }, boxEnd + 0.65)
        .to(transitionRef.current, { autoAlpha: 0, duration: 0.2 }, galleryStart - 0.2);
    }
    timeline.to({}, { duration: 0.01 }, duration - 0.01);
    const finishIntro = (immediate = false) => {
      autoplay?.kill();
      if (!introReady) {
        introReady = true;
        timeline.time(REVEAL);
        beginEntrance();
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
      onRefresh: () => {
        // Stay on the scrubbed playhead: jumping to raw scroll progress here
        // would snap ahead, then back on the next scrub update.
        if (introReady) timeline.time(playhead.time);
        renderShape(true);
      },
      onToggle: ({ isActive }) => { rig.style.willChange = isActive ? "transform" : "auto"; },
    });
    if (window.scrollY > trigger.start + 12) {
      finishIntro(true);
      timeline.time(REVEAL + trigger.progress * (duration - REVEAL));
    } else {
      autoplay = timeline.tweenTo(REVEAL, { duration: 1.6, ease: "none", onComplete: () => finishIntro() });
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
    const showFace = (index) => {
      finishIntro(true);
      const stop = TURN_START + index * 0.5;
      window.scrollTo({ top: trigger.start + distance * (stop - REVEAL) / (duration - REVEAL), behavior: "instant" });
      trigger.update();
      trigger.getTween()?.progress(1);
      scrollAnimation.progress((stop - REVEAL) / (duration - REVEAL));
    };
    const chooseFace = (event) => {
      const button = event.target.closest("button[data-face-button]");
      if (button) showFace(Number(button.dataset.faceButton));
    };
    const rotateWithKeyboard = (event) => {
      const buttons = faceButtons;
      const current = buttons.indexOf(event.target);
      if (current < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (current + (event.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length;
      showFace(next);
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
      .then(() => { if (!disposed) measure(); });

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
      ["--display-width", "--display-height", "--display-depth", "--display-gap", "--display-radius"].forEach((property) => rig.style.removeProperty(property));
      plane.removeAttribute("inert");
      plane.removeAttribute("aria-hidden");
      faces.filter((face) => face !== plane).forEach((face) => { face.inert = true; face.setAttribute("aria-hidden", "true"); face.style.removeProperty("visibility"); });
      plane.style.removeProperty("visibility");
      plane.style.removeProperty("--hero-frame-width");
      plane.style.removeProperty("--hero-frame-height");
      heroSurface.style.removeProperty("transform");
      heroSurface.removeAttribute("aria-hidden");
      heroSurface.inert = false;
      identityPanelRef.current.setAttribute("aria-hidden", "true");
      curtainPathRef.current.setAttribute("d", "M0,-4H1000V1002H0Z");
      root.style.removeProperty("--portal-height");
      root.style.removeProperty("--portal-distance");
      root.style.removeProperty("--portal-view-height");
      root.style.removeProperty("--portal-width");
      root.style.removeProperty("--display-size");
      root.style.removeProperty("--display-panel-height");
      delete root.dataset.workHandoff;
      delete root.dataset.portalActive;
      delete root.dataset.portalPhase;
      delete root.dataset.displayActiveFace;
      delete root.dataset.heroEntrance;
    };
  }, [sceneRef, moments]);

  useGsapScene({ scope: sceneRef, setup });

  return (
    <div ref={sceneRef} id="home" className={styles.scene} data-hero-entrance="waiting">
      <noscript><style>{`#home [data-boot-cover] { display: none !important; } #home [data-hero-plane] * { animation-play-state: running !important; } .site-header { visibility: visible !important; }`}</style></noscript>
      <div className={styles.stage}>
        <div className={styles.bootCover} data-boot-cover aria-hidden="true" />
        <div ref={backdropRef} className={styles.backdrop} aria-hidden="true" />
        <div ref={groundRef} className={styles.groundShadow} aria-hidden="true" />
        <p className={styles.displayHeading} data-display-heading>Achievements &amp; identity</p>
        <div ref={wordBandRef} className={styles.wordBand} aria-hidden="true">{["Full-stack", "Applied AI", "Built to ship"].map((phrase) => <span key={phrase}>{phrase}</span>)}</div>
        <div ref={rigRef} className={styles.rig} data-display-rig>
          <div className={styles.geometry}>
          <div className={styles.cubeSkin} data-cube-skin aria-hidden="true">
            {[0, 90, 180, 270].map((angle) => <div key={angle} className={styles.cubeShellFace} style={{ "--face-angle": `${angle}deg` }} />)}
            <div className={`${styles.cubeShellFace} ${styles.cubeTop}`} />
            <div className={`${styles.cubeShellFace} ${styles.cubeBottom}`} />
          </div>
          <div ref={planeRef} className={styles.plane} data-hero-plane data-identity-face="0">
            <div ref={heroSurfaceRef} className={styles.heroSurface}>{children}</div>
            <div ref={identityPanelRef} className={styles.identityPanel} aria-hidden="true"><h2>{site.about.phrases.map((phrase) => <span key={phrase}>{phrase}</span>)}</h2></div>
          </div>
          <IdentityDisplayFaces moments={moments} />
          </div>
        </div>
        <div ref={transitionRef} className={styles.galleryTransition} aria-hidden="true"><canvas ref={particleCanvasRef} className={styles.particleCanvas} data-particle-portal /><svg viewBox="-20 -20 40 40"><path d={opening} /></svg></div>
        <div ref={veilRef} className={styles.curtain} data-opening-curtain aria-hidden="true">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false">
            <path ref={curtainPathRef} d="M0,-4H1000V1002H0Z" data-curtain-path />
          </svg>
          <div className={styles.introLabel}><span ref={introLabelRef}>{profile.name}</span></div>
        </div>
        <div ref={controlsRef} className={styles.controls}>
          <button ref={skipRef} type="button" className={styles.skip}>Skip intro <ArrowUpRight size={15} aria-hidden="true" /></button>
        </div>
        <div ref={displayControlsRef} className={styles.displayControls}>
          <div className={`${styles.faceButtons} ${styles.momentButtons}`} role="group" aria-label="Achievements and identity">
            {moments.map((moment, index) => <button key={moment.id} type="button" data-face-button={index} aria-label={`Show ${moment.label}`} aria-pressed={false}><span /></button>)}
          </div>
          <Link className={`${styles.archiveLink} portfolio-button portfolio-button--small`} href="/projects">{site.projects.archiveLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <a className={`${styles.continueLink} portfolio-button portfolio-button--small`} href="#projects">Selected work <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Film, Pause, Play, X } from "lucide-react";
import styles from "./ProjectEditorialGallery.module.css";

// Editorial spreads inherit the portfolio's dark olive, cream and lime world.
// Real project media leads; selection and full-size inspection carry interaction.
// Preserve the introduction and case studies; never invent project proof.
function mediaFor(project) {
  const images = (project.gallery || []).filter((image) => image.src).map((image) => ({ ...image, type: "image" }));
  if (!images.length && project.cover?.src) images.push({ ...project.cover, type: "image" });
  if (project.showcase?.videoSrc) images.unshift({
    type: "video", src: project.showcase.videoSrc, poster: project.showcase.posterSrc || project.cover?.src,
    title: `${project.title} film`, caption: project.showcase.caption || `${project.title} in motion.`,
  });
  return images.length ? images : [{ type: "placeholder", title: project.title, caption: "Media preview coming soon." }];
}

function Placeholder({ title, label = "Media preview coming soon" }) {
  return <div className={styles.placeholder}><span>{title}</span><p>{label}</p></div>;
}

function MediaAsset({ item, project, enabled = true, large = false }) {
  const [failed, setFailed] = useState(false);
  const [playingGif, setPlayingGif] = useState(false);
  const videoRef = useRef(null);
  const gif = /\.gif(?:\?|$)/i.test(item.src || "");
  const poster = item.poster || (!/\.gif(?:\?|$)/i.test(project.cover?.src || "") ? project.cover?.src : null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!enabled) video.pause();
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause(); });
    const onVisibility = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { video.pause(); observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [enabled]);
  if (failed || item.type === "placeholder") return <Placeholder title={project.title} label={failed ? "Preview unavailable" : undefined} />;
  if (item.type === "video") return <video ref={videoRef} controls playsInline preload="none" poster={poster} src={item.src} aria-label={item.title} onError={() => setFailed(true)} />;
  const src = gif && (!playingGif || !enabled) ? poster : item.src;
  return <>
    {src ? <Image src={src} alt={item.alt || item.title || project.title} fill sizes={large ? "92vw" : "(max-width: 767px) 92vw, 84vw"} unoptimized={gif} onError={() => setFailed(true)} /> : <Placeholder title={project.title} label="Animated preview" />}
    {gif && <button className={styles.gifControl} type="button" onClick={() => setPlayingGif((value) => !value)}>{playingGif ? <Pause size={16} /> : <Play size={16} />}{playingGif ? "Pause animation" : "Play animation"}</button>}
  </>;
}

function ProjectFeature({ project, index, indexed = false }) {
  const items = useMemo(() => mediaFor(project), [project]);
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef(null);
  const stripRef = useRef(null);
  const item = items[selected % items.length];
  const move = (direction) => setSelected((value) => (value + direction + items.length) % items.length);
  const id = `work-${project.slug}`;

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);

  const open = () => { setExpanded(true); dialogRef.current.showModal(); };
  const handleKeys = (event) => {
    if (event.target.tagName === "VIDEO") return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
  };
  const chooseWithKeyboard = (event, position) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (position + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    setSelected(next);
    stripRef.current?.querySelectorAll("button")[next]?.focus({ preventScroll: true });
    const strip = stripRef.current;
    const target = strip?.querySelectorAll("button")[next];
    if (target) strip.scrollTo({ left: target.offsetLeft - (strip.clientWidth - target.offsetWidth) / 2, behavior: "instant" });
  };

  return <article id={id} className={styles.feature} data-project-feature data-layout={indexed ? "index" : index < 2 ? "wide" : "compact"} aria-labelledby={`${id}-title`}>
    <div className={styles.featureHeading}>
      <h3 id={`${id}-title`}><Link href={`/projects/${project.slug}`}>{project.title}<ArrowUpRight aria-hidden="true" /></Link></h3>
      <span className={styles.category}>{project.category}<span>{project.period}</span></span>
    </div>
    <figure className={styles.figure}>
      <div className={styles.media} data-media-stage data-tone={index % 3} style={indexed ? { "--media-ratio": Math.max(1.3, Math.min(2.1, (item.width || 1600) / (item.height || 1000))) } : undefined} onKeyDown={handleKeys}>
        <div key={item.src || "placeholder"} className={styles.asset}><MediaAsset item={item} project={project} enabled={!expanded} /></div>
        <div className={styles.mediaTopline}><span>{item.type === "video" ? "Film" : item.kind === "illustration" ? "Illustration" : "Project preview"}</span><button type="button" onClick={open} aria-label={`Expand ${project.title} preview`}><Expand size={17} /><span>Full screen</span></button></div>
      </div>
      <div className={styles.mediaFooter}>
        <figcaption aria-live="polite"><strong>{item.title}</strong><span>{item.caption}</span></figcaption>
        {items.length > 1 && <div className={styles.arrows}><button type="button" aria-label={`Previous ${project.title} image`} onClick={() => move(-1)}><ArrowLeft size={18} /></button><span>{String(selected % items.length + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><button type="button" aria-label={`Next ${project.title} image`} onClick={() => move(1)}><ArrowRight size={18} /></button></div>}
      </div>
      {items.length > 1 && <div ref={stripRef} className={styles.filmstrip} role="group" aria-label={`${project.title} previews`}>
        {items.map((media, position) => <button key={`${media.src}-${position}`} type="button" aria-label={`Show ${media.title}`} aria-pressed={selected % items.length === position} onClick={() => setSelected(position)} onKeyDown={(event) => chooseWithKeyboard(event, position)}>
          {(media.type === "video" || /\.gif(?:\?|$)/i.test(media.src)) ? <Film size={21} /> : <Image src={/\.gif(?:\?|$)/i.test(media.src) ? project.showcase?.posterSrc || project.cover.src : media.src} alt="" width={104} height={66} sizes="72px" unoptimized={/\.gif(?:\?|$)/i.test(media.src)} />}
        </button>)}
      </div>}
    </figure>
    <div className={styles.projectBody}>
      <p>{project.description}</p>
      <div className={styles.projectDetails}><p>{project.stack}</p><Link href={`/projects/${project.slug}`}>Explore project <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
    </div>
    <dialog ref={dialogRef} className={styles.lightbox} aria-label={`${project.title} media viewer`} onClose={() => setExpanded(false)} onKeyDown={handleKeys} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      {expanded && <div className={styles.viewer}>
        <div className={styles.viewerHeader}><strong>{project.title}</strong><button type="button" autoFocus onClick={() => dialogRef.current.close()} aria-label="Close preview"><X size={23} /></button></div>
        <div className={styles.viewerAsset} key={item.src || "placeholder"}><MediaAsset item={item} project={project} large /></div>
        <div className={styles.viewerFooter}><p aria-live="polite">{item.caption}</p><div className={styles.arrows}><button type="button" disabled={items.length === 1} onClick={() => move(-1)} aria-label="Previous preview"><ArrowLeft size={20} /></button><span>{selected % items.length + 1} / {items.length}</span><button type="button" disabled={items.length === 1} onClick={() => move(1)} aria-label="Next preview"><ArrowRight size={20} /></button></div></div>
      </div>}
    </dialog>
  </article>;
}

export function ProjectSpreadGallery({ projects, archiveLabel }) {
  return <div id="selected-projects" className={styles.gallery}>
    <nav className={styles.index} aria-label="Project index"><span>Explore the work <span>({String(projects.length).padStart(2, "0")})</span></span><div>{projects.map((project) => <a key={project.slug} href={`#work-${project.slug}`}>{project.title}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div></nav>
    <div className={styles.spreads}>{projects.map((project, index) => <ProjectFeature key={project.slug} project={project} index={index} />)}</div>
    <div className={styles.closing}><Link href="/projects">{archiveLabel}<ArrowUpRight aria-hidden="true" /></Link><span>More detail. The whole story.</span></div>
  </div>;
}


// A work index keeps the whole collection visible beside one large media stage.
// Selection changes the artifact, never the scroll position or the project facts.
export function ProjectIndexGallery({ projects, archiveLabel }) {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const selected = projects.length ? active % projects.length : 0;
  const project = projects[selected];
  useEffect(() => {
    if (!compact) return;
    const strip = listRef.current;
    const target = strip?.querySelectorAll('[role="tab"]')[selected];
    if (target) strip.scrollTo({ left: target.offsetLeft - 5, behavior: "instant" });
  }, [compact, selected]);
  const chooseWithKeys = (event, index) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + projects.length) % projects.length;
    setActive(next);
    const target = listRef.current?.querySelectorAll('[role="tab"]')[next];
    target?.focus({ preventScroll: true });
    if (compact && target) listRef.current.scrollTo({ left: target.offsetLeft - 5, behavior: "instant" });
  };
  return <div id="selected-projects" className={`${styles.gallery} ${styles.workIndex}`}>
    <div className={styles.indexHeader}><span>{String(projects.length).padStart(2, "0")} projects</span><Link href="/projects">{archiveLabel}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    <div className={styles.indexLayout}>
      <div className={styles.projectList}>
        <div ref={listRef} role="tablist" aria-label="Choose a project" aria-orientation={compact ? "horizontal" : "vertical"}>
          {projects.map((entry, index) => <button key={entry.slug} id={`project-tab-${entry.slug}`} type="button" role="tab" aria-selected={selected === index} aria-controls="project-preview" tabIndex={selected === index ? 0 : -1} className={styles.projectTab} onClick={() => setActive(index)} onFocus={() => setActive(index)} onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(index); }} onKeyDown={(event) => chooseWithKeys(event, index)}>
            <span className={styles.projectName}>{entry.title}</span>
            <span className={styles.projectRowMeta}><span>{entry.category}</span><span>{entry.period}</span></span>
          </button>)}
        </div>
        <p className={styles.indexHint}>Select a project to explore.</p>
      </div>
      {project ? <div className={styles.inspector} role="tabpanel" id="project-preview" aria-labelledby={`project-tab-${project.slug}`}>
        <ProjectFeature key={project.slug} project={project} index={selected} indexed />
      </div> : <p>Project previews will appear here when published.</p>}
    </div>
  </div>;
}

export { default } from "./ProjectWorkList";

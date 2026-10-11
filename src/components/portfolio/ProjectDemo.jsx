import { useEffect, useRef, useState } from "react";
import styles from "./ProjectDemo.module.css";

export default function ProjectDemo({ title, showcase, cover }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause(); });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, [showcase?.videoSrc]);
  if (!showcase?.videoSrc) return null;
  return <figure id="project-demo" className={styles.demo}>
    <video ref={videoRef} controls playsInline preload="none" poster={showcase.posterSrc || cover?.src}
      aria-label={`${title} demo`} aria-describedby="project-demo-caption" onError={() => setFailed(true)}>
      <source src={showcase.videoSrc} />
      Your browser does not support embedded video.
    </video>
    <figcaption id="project-demo-caption"><strong>Project demo</strong>{showcase.caption && <span>{showcase.caption}</span>}</figcaption>
    {failed && <p role="status">The demo could not load. You can still explore the screenshots below.</p>}
  </figure>;
}

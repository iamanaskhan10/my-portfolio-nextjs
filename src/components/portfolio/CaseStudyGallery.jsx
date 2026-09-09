import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import styles from "./CaseStudyGallery.module.css";

export default function CaseStudyGallery({ images, title }) {
  const [selected, setSelected] = useState(0);
  const dialogRef = useRef(null);
  const active = images[selected];
  const move = (direction) => setSelected((index) => (index + direction + images.length) % images.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    const unlock = () => { document.body.style.overflow = dialog.dataset.previousOverflow || ""; };
    dialog.addEventListener("close", unlock);
    return () => { if (dialog.open) unlock(); dialog.removeEventListener("close", unlock); };
  }, []);

  const open = () => {
    const dialog = dialogRef.current;
    dialog.dataset.previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  };

  return (
    <section className={styles.gallery} id="gallery" aria-label={`${title} image gallery`}>
      <figure className={styles.featured}>
        <button type="button" className={styles.preview} data-kind={active.kind} onClick={open} aria-label={`Expand ${active.title}`}>
          <Image src={active.src} alt={active.alt} width={active.width} height={active.height} priority sizes="(max-width: 767px) 92vw, 80vw" />
          <span className={styles.expand}><Expand size={16} aria-hidden="true" /> View full size</span>
        </button>
        <figcaption aria-live="polite"><strong>{active.title}</strong><span>{active.caption}</span><span className={styles.count}>{selected + 1} / {images.length}</span></figcaption>
      </figure>
      <div className={styles.thumbnails} aria-label="Choose an image">
        {images.map((item, index) => (
          <button type="button" key={item.src} onClick={() => setSelected(index)} aria-pressed={selected === index} className={styles.thumbnail}>
            <span className={styles.thumbImage} data-kind={item.kind}><Image src={item.src} alt="" width={item.width} height={item.height} sizes="(max-width: 767px) 28vw, 24vw" /></span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <dialog ref={dialogRef} className={styles.lightbox} aria-label={`${title} full-size gallery`}
        onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}>
        <div className={styles.viewer}>
          <div className={styles.viewerHeader}><span>{title}</span><button type="button" autoFocus onClick={() => dialogRef.current.close()} aria-label="Close gallery"><X size={23} /></button></div>
          <div className={styles.viewerImage} data-kind={active.kind}><Image src={active.src} alt={active.alt} width={active.width} height={active.height} sizes="94vw" /></div>
          <div className={styles.viewerFooter}>
            <div aria-live="polite"><strong>{active.title}</strong><p>{active.caption}</p></div>
            <div className={styles.viewerControls}><button type="button" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft size={20} /></button><span>{selected + 1} / {images.length}</span><button type="button" onClick={() => move(1)} aria-label="Next image"><ArrowRight size={20} /></button></div>
          </div>
        </div>
      </dialog>
    </section>
  );
}

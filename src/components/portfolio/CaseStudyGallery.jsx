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

  const open = (index) => {
    setSelected(index);
    const dialog = dialogRef.current;
    dialog.dataset.previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  };

  return (
    <section className={styles.gallery} id="gallery" aria-label={`${title} image gallery`}>
      <div className={styles.exhibition}>
        {images.map((item, index) => (
          <figure key={item.src} className={styles.artwork}>
          <button type="button" className={styles.preview} data-kind={item.kind} onClick={() => open(index)} aria-label={`Expand ${item.title}`}>
            <Image src={item.src} alt={item.alt} width={item.width} height={item.height} priority={index === 0} sizes={index === 0 ? "88vw" : "(max-width: 767px) 88vw, 42vw"} />
            <span className={styles.expand}><Expand size={18} aria-hidden="true" /><span>View full size</span></span>
          </button>
          <figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption>
          </figure>
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

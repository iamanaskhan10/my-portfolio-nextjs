import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./HeroPortal.module.css";

export default function ProjectOrbit({ projects, heading }) {
  return (
    <>
      <div className={styles.orbitBackground} data-orbit-background aria-hidden="true" />
      <h2 className={styles.orbitHeading}>{heading}</h2>
      <div className={styles.orbitCamera} data-orbit-camera>
        {projects.map((project, index) => (
          <div key={project.slug} className={styles.orbitCluster} data-orbit-cluster={index}>
          <Link key={project.slug} className={styles.orbitCard} data-orbit-card={index} href={`/projects/${project.slug}`} inert aria-hidden="true">
            <Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width || 1200} height={project.cover.height || 700} sizes="(max-width: 767px) 82vw, 1040px" />
            <span className={styles.orbitCaption}><span>{project.title}</span><ArrowUpRight aria-hidden="true" /></span>
          </Link>
          {project.gallery.filter((image) => image.src !== project.cover.src).slice(0, 2).map((image, imageIndex) => (
            <figure key={image.src} className={styles.orbitSatellite} data-orbit-satellite={imageIndex} aria-hidden="true">
              <Image src={image.src} alt="" width={image.width || 1200} height={image.height || 700} sizes="(max-width: 767px) 28vw, 280px" />
            </figure>
          ))}
          </div>
        ))}
      </div>
    </>
  );
}

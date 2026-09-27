import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./HeroPortal.module.css";

export default function ProjectOrbit({ projects, heading }) {
  return (
    <>
      <h2 className={styles.orbitHeading}>{heading}</h2>
      <div className={styles.orbitCamera} data-orbit-camera>
        {projects.map((project, index) => (
          <Link key={project.slug} className={styles.orbitCard} data-orbit-card={index} href={`/projects/${project.slug}`} inert aria-hidden="true">
            <Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width || 1200} height={project.cover.height || 700} sizes="(max-width: 767px) 82vw, 750px" />
            <span className={styles.orbitCaption}><span>{project.title}</span><ArrowUpRight aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </>
  );
}

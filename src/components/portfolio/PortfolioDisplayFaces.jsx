import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "./BrandMark";
import styles from "./HeroPortal.module.css";

// These are previews of existing CMS content. The full sections, project
// archive and case studies remain in their original locations.
export default function PortfolioDisplayFaces({ projects }) {
  return (
    <>
      {projects.map((project, index) => {
        return (
          <article key={project.slug} className={styles.displayFace} data-project-face={index} style={{ "--face-angle": `${((index + 1) % 4) * 90}deg` }} inert aria-hidden="true">
              <>
                <div className={styles.faceMeta}><BrandMark /><span>{project.group}</span></div>
                <h2 className={styles.faceTitle}>{project.title}</h2>
                <figure className={styles.faceImage}>
                  <Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width || 1200} height={project.cover.height || 700} sizes="(max-width: 767px) 70vw, 440px" />
                </figure>
                <p className={styles.faceDescription}>{project.headline || project.description}</p>
                <Link className={styles.faceLink} href={`/projects/${project.slug}`}>View project <ArrowUpRight aria-hidden="true" /></Link>
              </>
          </article>
        );
      })}
    </>
  );
}

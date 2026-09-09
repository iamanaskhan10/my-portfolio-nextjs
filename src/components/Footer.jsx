import { ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";
import BrandMark from "./portfolio/BrandMark";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Anas Khan footer">
      <div className={styles.inner}>
        <a className={styles.identity} href="/#home" aria-label="Anas Khan home">
          <BrandMark className={styles.mark} />
          <span>{profile.name}<small>&copy; {new Date().getFullYear()}</small></span>
        </a>
        <nav className={styles.links} aria-label="Social and contact links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
        <a className={styles.back} href="/#home" aria-label="Back to top">
          <ArrowUp size={18} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

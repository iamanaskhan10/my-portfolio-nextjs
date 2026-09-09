import BrandMark from "./BrandMark";
import styles from "./BrandWatermark.module.css";

export default function BrandWatermark({ variant = "closing" }) {
  return (
    <div className={`${styles.frame} ${styles[variant]}`} aria-hidden="true" data-brand-watermark>
      <BrandMark className={styles.mark} glow engrave={variant === "hero"} />
    </div>
  );
}

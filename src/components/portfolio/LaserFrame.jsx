import styles from "./LaserFrame.module.css";

// Distinct compositions share sharp turns and continuous routing.
// Every endpoint extends beyond its section's clipping boundary.
const compositions = {
  hero: { viewBox: "0 0 120 480", path: "M-24 -40 96 200 36 260 36 360 -24 420" },
  stack: { viewBox: "0 0 120 320", path: "M-24 40 96 160 36 220 156 340" },
  work: { viewBox: "0 0 120 600", path: "M144 -40 24 80 V280 L84 340 V460 L144 520" },
};

export default function LaserFrame({ variant = "work" }) {
  const { viewBox, path } = compositions[variant];
  return (
    <div className={`${styles.frame} ${styles[variant]}`} aria-hidden="true" data-laser-frame={variant}>
        <svg viewBox={viewBox} fill="none" focusable="false">
          <path className={styles.glow} d={path} />
          <path className={styles.core} d={path} />
        </svg>
    </div>
  );
}

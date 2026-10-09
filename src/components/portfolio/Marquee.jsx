import styles from "./Marquee.module.css";

/** Decorative seamless text loop; the caller controls whether it is visible. */
export default function Marquee({ items, active = false, duration = 30 }) {
  return <div className={styles.viewport} data-marquee data-active={active} aria-hidden="true" style={{ "--marquee-duration": `${duration}s` }}>
    <div className={styles.track}>
      {[0, 1].map((copy) => <div key={copy} className={styles.group}>{items.map((item, index) => <span key={index}>{item}</span>)}</div>)}
    </div>
  </div>;
}

import styles from "./ProjectMetric.module.css";

export default function ProjectMetric({ metric }) {
  if (!metric) return null;

  return (
    <dl className={styles.metric}>
      <dt>{metric.label}</dt>
      <dd className={styles.value}>{metric.value}</dd>
      <dd className={styles.detail}>{metric.detail}</dd>
    </dl>
  );
}

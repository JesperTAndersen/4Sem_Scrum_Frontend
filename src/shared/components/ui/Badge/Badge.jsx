import styles from "./Badge.module.css";

const STATUS_COLORS = {
  DRAFT: styles.neutral,
  PLANNED: styles.info,
  IN_PROGRESS: styles.warning,
  COMPLETED: styles.success,
  NOT_STARTED: styles.neutral,
  DONE: styles.success,
};

const STATUS_LABELS = {
  DRAFT: "Kladde",
  PLANNED: "Planlagt",
  IN_PROGRESS: "I gang",
  COMPLETED: "Afsluttet",

  NOT_STARTED: "Ikke startet",
  DONE: "Færdig",
};

const Badge = ({ status, label }) => {
  const colorClass = STATUS_COLORS[status] ?? styles.neutral;
  const displayLabel = label ?? STATUS_LABELS[status] ?? status;

  return <span className={`${styles.badge} ${colorClass}`}>{displayLabel}</span>;
};

export default Badge;
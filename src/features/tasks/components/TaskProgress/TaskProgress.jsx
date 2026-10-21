import styles from "./TaskProgress.module.css";
import ProgressBar from "@/shared/components/ui/ProgressBar/ProgressBar";

const TaskProgress = ({ done = 0, inProgress = 0, notStarted = 0, title }) => {
  const total = done + inProgress + notStarted;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const label = `${done} ud af ${total} opgaver færdige`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          {title && <h3 className={styles.title}>{title}</h3>}

          <span className={styles.text}>{label}</span>
        </div>

        <span className={styles.percent}>{percent}%</span>
      </div>

      <ProgressBar value={done} max={total} label={label} />

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{done}</span>

          <span className={styles.statLabel}>Færdige</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.statValue}>{inProgress}</span>

          <span className={styles.statLabel}>I gang</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.statValue}>{notStarted}</span>

          <span className={styles.statLabel}>Ikke startet</span>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;

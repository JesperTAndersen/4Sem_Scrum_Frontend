import styles from "./ProgressBar.module.css";

const ProgressBar = ({ value = 0, max = 100 }) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>
          {value} ud af {max} færdige
        </span>

        <span>{percentage}%</span>
      </div>

      <progress className={styles.progress} value={value} max={max} />
    </div>
  );
};

export default ProgressBar;

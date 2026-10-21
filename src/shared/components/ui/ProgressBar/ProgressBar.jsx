import styles from "./ProgressBar.module.css";

const ProgressBar = ({ value = 0, max = 0, label }) => {
  return (
    <progress
      className={styles.progress}
      value={value}
      max={max || 1}
      aria-label={label}
    />
  );
};

export default ProgressBar;

import styles from "./LoadingSpinner.module.css";
import { FiLoader } from "react-icons/fi";

const LoadingSpinner = ({
  text = "Henter...",
  size = "md",
  inline = false,
}) => {
  return (
    <div className={`${styles.container} ${inline ? styles.inline : ""}`}>
      <FiLoader className={`${styles.spinner} ${styles[size]}`} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;

import styles from "./UnderDevelopmentPage.module.css";
import { FiTool } from "react-icons/fi";

const UnderDevelopmentPage = () => {
  return (
    <div className={styles.wrapper}>
      <FiTool className={styles.icon} />
      <h1 className={styles.title}>Kommer snart</h1>
      <p className={styles.text}>
        Denne side er under udvikling og vil snart være tilgængeligt.
      </p>
    </div>
  );
};

export default UnderDevelopmentPage;

import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";
import { FiAlertCircle } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <FiAlertCircle className={styles.icon} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Siden blev ikke fundet</p>
      <Link to="/" className={styles.link}>
        Gå til forsiden
      </Link>
    </div>
  );
};

export default NotFoundPage;

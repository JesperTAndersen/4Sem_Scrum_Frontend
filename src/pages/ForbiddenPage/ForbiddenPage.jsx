import { Link } from "react-router-dom";
import styles from "./ForbiddenPage.module.css";
import { FiAlertTriangle } from "react-icons/fi";
import { roleRoutes } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

const ForbiddenPage = () => {
  const { user } = useAuth();
  const home = roleRoutes[user?.userRole] || "/";

  return (
    <div className={styles.wrapper}>
      <FiAlertTriangle className={styles.icon} />
      <h1 className={styles.title}>403</h1>

      <p className={styles.text}>Du har ikke adgang til denne side</p>
      <Link to="/" className={styles.link}>
        Gå til forsiden
      </Link>

      <Link to={home} className={styles.link}>
        Gå til din startside
      </Link>
    </div>
  );
};

export default ForbiddenPage;

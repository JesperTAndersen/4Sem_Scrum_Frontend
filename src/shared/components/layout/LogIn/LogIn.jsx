import styles from "../shared/AuthAction.module.css";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const LogIn = ({ to }) => {
  return (
    <Link to={to} className={styles.actionButton}>
      <span>Log ind</span>
      <FiLogIn />
    </Link>
  );
};

export default LogIn;

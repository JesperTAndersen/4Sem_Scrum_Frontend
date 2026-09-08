import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import styles from './SeeAllLink.module.css';

const SeeAllLink = ({ to, text = "Se alle" }) => {
  return (
    <Link to={to} className={styles.link}>
      <span>{text}</span>
      <FiArrowRight className={styles.icon} />
    </Link>
  );
};

export default SeeAllLink;
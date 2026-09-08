import styles from './BackButton.module.css';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const BackButton = ({ to, label = 'Tilbage' }) => {
  const navigate = useNavigate();
  const handleClick = () => (to ? navigate(to) : navigate(-1));

  return (
    <button className={styles.backButton} onClick={handleClick}>
      <FiArrowLeft />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
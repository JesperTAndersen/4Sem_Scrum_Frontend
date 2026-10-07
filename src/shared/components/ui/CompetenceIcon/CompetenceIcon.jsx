import styles from './AllergenIcon.module.css';
import { allergenIconByDisplayNumber } from '../../../features/allergens/utils/allergenIconMap';

const CompetenceIcon = ({ displayNumber, size = 'sm' }) => {
  const src = allergenIconByDisplayNumber[displayNumber];

  if (!src) {
    return <div className={`${styles.fallback} ${styles[size]}`}>?</div>;
  }

  return (
    <img
      className={`${styles.icon} ${styles[size]}`}
      src={src}
      loading="lazy"
    />
  );
};

export default AllergenIcon;

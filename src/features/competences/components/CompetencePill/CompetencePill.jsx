import styles from './CompetencePill.module.css';

const CompetencePill = ({ competence }) => {

  return (
    <span className={styles.pill}>
      <span className={styles.number}>{competence.displayNumber}</span>
      <span className={styles.name}>{competence.name}</span>
    </span>
  );
};

export default CompetencePill;
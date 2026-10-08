import styles from "./CompetencePill.module.css";
import CompetenceIcon from "../CompetenceIcon/CompetenceIcon";

const CompetencePill = ({ competence }) => {
  return (
    <span className={styles.pill}>
      <CompetenceIcon name={competence.name} size="xs" />
      <span className={styles.name}>{competence.name}</span>
    </span>
  );
};

export default CompetencePill;

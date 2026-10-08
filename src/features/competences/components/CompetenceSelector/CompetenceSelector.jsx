import styles from "./CompetenceSelector.module.css";
import CompetenceIcon from "../CompetenceIcon/CompetenceIcon";

const CompetenceSelector = ({ competences, selectedIds, onToggle }) => {
  return (
    <div>
      <label className={styles.groupLabel}>Indeholder kompetencer:</label>
      <div className={styles.grid}>
        {competences.map((c) => {
          const isSelected = selectedIds.includes(c.id);

          return (
            <button
              key={c.id}
              type="button"
              className={`${styles.competenceBadge} ${isSelected ? styles.selected : ""}`}
              onClick={() => onToggle(c.id)}
            >
              <CompetenceIcon name={c.name} size="xs" />
              <span className={styles.name}>{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CompetenceSelector;

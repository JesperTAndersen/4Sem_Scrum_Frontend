import styles from './CompetenceSelector.module.css';

const CompetenceSelector = ({ competences, selectedIds, onToggle }) => {
  return (
    <div>
      <label className={styles.groupLabel}>
        Indeholder kompetencer:
      </label>
      <div className={styles.grid}>
        {competences.map((c) => {
          const isSelected = selectedIds.includes(c.id);

          return (
            <button
              key={c.id}
              type="button"
              className={`${styles.competenceBadge} ${isSelected ? styles.selected : ''}`}
              onClick={() => onToggle(c.id)}
            >
              <span className={styles.number}>{c.displayNumber}</span>
              <span className={styles.name}>{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CompetenceSelector;

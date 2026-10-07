import styles from './AllergenSelector.module.css';

const AllergenSelector = ({ allergens, selectedIds, onToggle }) => {
  return (
    <div>
      <label className={styles.groupLabel}>
        Indeholder allergener:
      </label>
      <div className={styles.grid}>
        {allergens.map((allergen) => {
          const isSelected = selectedIds.includes(allergen.id);

          return (
            <button
              key={allergen.id}
              type="button"
              className={`${styles.allergenBadge} ${isSelected ? styles.selected : ''}`}
              onClick={() => onToggle(allergen.id)}
            >
              <span className={styles.number}>{allergen.displayNumber}</span>
              <span className={styles.name}>{allergen.nameDA}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AllergenSelector;

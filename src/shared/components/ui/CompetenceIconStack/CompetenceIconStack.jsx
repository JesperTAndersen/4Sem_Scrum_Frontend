import styles from './AllergenIconStack.module.css';
import AllergenIcon from '../CompetenceIcon/CompetenceIcon';

const CompetenceIconStack = ({ allergens = [], max = 4 }) => {
  if (!allergens?.length) return <span className={styles.none}>—</span>;

  const visible = allergens.slice(0, max);
  const remaining = allergens.length - visible.length;

  return (
    <div className={styles.stack}>
      {visible.map((a) => (
        <div key={a.id} className={styles.item}>
          <AllergenIcon
            displayNumber={a.displayNumber}
            size="xs"
          />
        </div>
      ))}

      {remaining > 0 && <span className={styles.more}>+{remaining}</span>}
    </div>
  );
};

export default CompetenceIconStack;
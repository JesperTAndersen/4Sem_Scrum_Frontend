import styles from "./CompetenceIconStack.module.css";
import CompetenceIcon from "../CompetenceIcon/CompetenceIcon";

const CompetenceIconStack = ({ competences = [], max = 4 }) => {
  if (!competences?.length) return <span className={styles.none}>—</span>;

  const visible = competences.slice(0, max);
  const remaining = competences.length - visible.length;

  return (
    <div className={styles.stack}>
      {visible.map((c) => (
        <div key={c.id} className={styles.item}>
          <CompetenceIcon displayNumber={c.displayNumber} size="xs" />
        </div>
      ))}

      {remaining > 0 && <span className={styles.more}>+{remaining}</span>}
    </div>
  );
};

export default CompetenceIconStack;

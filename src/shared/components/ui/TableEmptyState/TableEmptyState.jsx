import styles from "./TableEmptyState.module.css";
import Button from "../Button/Button";
import { FiSearch, FiX } from "react-icons/fi";

const TableEmptyState = ({
  text = "Ingen resultater.",
  onReset,
  resetLabel = "Nulstil",
}) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyText}>
        <FiSearch className={styles.emptyIcon} />
        <span>{text}</span>
      </div>

      {onReset && (
        <Button
          type="button"
          variant="secondary"
          name={resetLabel}
          icon={<FiX />}
          onClick={onReset}
        />
      )}
    </div>
  );
};

export default TableEmptyState;

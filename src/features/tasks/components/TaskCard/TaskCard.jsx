import styles from "./TaskCard.module.css";

import Badge from "@/shared/components/ui/Badge/Badge";
import { FiChevronRight } from "react-icons/fi";

const TaskCard = ({ task, onClick }) => {
  if (!task) return null;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onClick?.(task)}
    >
      <div className={styles.header}>
        <h4 className={styles.taskName}>{task.name}</h4>

        <Badge status={task.status || "NOT_STARTED"} />
      </div>

      <div className={styles.meta}>
        <div className={styles.field}>
          <span className={styles.label}>Kompetence</span>
          <span className={styles.value}>
            {task.competence?.name || "Ingen kompetence"}
          </span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Estimeret tid</span>
          <span className={styles.value}>{task.estimate ?? 0} timer</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Minimum varighed</span>
          <span className={styles.value}>
            {task.minimumDurationInDays ?? 0} dage
          </span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Planlagt varighed</span>
          <span className={styles.value}>
            {task.scheduledDurationInDays != null
              ? `${task.scheduledDurationInDays.toFixed(2)} dage`
              : "-"}
          </span>
        </div>

        {task.predecessorIds?.length > 0 && (
          <div className={styles.field}>
            <span className={styles.label}>Afhænger af</span>
            <span className={styles.value}>
              {task.predecessorIds.length}{" "}
              {task.predecessorIds.length === 1 ? "opgave" : "opgaver"}
            </span>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.openText}>Se detaljer</span>
        <FiChevronRight size={18} />
      </div>
    </button>
  );
};

export default TaskCard;

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
      <div className={styles.top}>
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
            <span className={styles.value}>
              {task.estimate ?? 0} timer
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
        </div>
      </div>

      <FiChevronRight className={styles.chevron} />
    </button>
  );
};

export default TaskCard;
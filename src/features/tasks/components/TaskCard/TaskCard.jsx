import styles from "./TaskCard.module.css";
import { formatCurrency } from "@/utils/formatters";
import { formatDate } from "@/utils/dateHelpers";
import Badge from "@/shared/components/ui/Badge/Badge";
import { FiChevronRight } from "react-icons/fi";

const formatDays = (days) =>
  (days ?? 0).toLocaleString("da-DK", { maximumFractionDigits: 1 });

const TaskCard = ({ task, tasks = [], onClick }) => {
  if (!task) return null;

  const predecessorNames = (task.predecessorIds ?? [])
    .map((id) => tasks.find((t) => t.id === id)?.name)
    .filter(Boolean);

  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onClick?.(task)}
    >
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h4 className={styles.taskName}>{task.name}</h4>

          {task.startDate && task.endDate && (
            <span className={styles.period}>
              {formatDate(task.startDate)} – {formatDate(task.endDate)}
            </span>
          )}
        </div>

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
          <span className={styles.label}>Pris</span>
          <span className={styles.value}>{formatCurrency(task.cost ?? 0)}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Varighed</span>
          <span className={styles.value}>
            {formatDays(task.scheduledDurationInDays)} dage (min.{" "}
            {formatDays(task.minimumDurationInDays)})
          </span>
        </div>

        {predecessorNames.length > 0 && (
          <div className={styles.field}>
            <span className={styles.label}>Afhænger af</span>
            <span className={styles.value}>{predecessorNames.join(", ")}</span>
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

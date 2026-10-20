import styles from "./TaskCard.module.css";
import { formatCurrency } from "@/utils/formatters";
import { formatShortDate } from "@/utils/dateHelpers";
import formatDays from "../../utils/formatDays";
import Badge from "@/shared/components/ui/Badge/Badge";
import { FiChevronRight, FiLink, FiUsers } from "react-icons/fi";


const TaskCard = ({ task, tasks = [], onClick }) => {
  if (!task) return null;

  const predecessorNames = (task.predecessorIds ?? [])
    .map((id) => tasks.find((t) => t.id === id)?.name)
    .filter(Boolean);

  const employeeNames = (task.assignedEmployees ?? []).map(
    (employee) => `${employee.firstName} ${employee.lastName}`,
  );

  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onClick?.(task)}
    >
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h4 className={styles.taskName} title={task.name}>
            {task.name}
          </h4>

        </div>

        <div className={styles.badges}>
          <Badge status={task.status || "NOT_STARTED"} />

          {task.staffingStatus && task.staffingStatus !== "STAFFED" && (
            <Badge status={task.staffingStatus} />
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.field}>
          <span className={styles.label}>Periode</span>
          <span className={`${styles.value} ${styles.period}`}>
            {task.startDate && task.endDate
              ? `${formatShortDate(task.startDate)} – ${formatShortDate(task.endDate)}`
              : "Kan ikke beregnes"}
          </span>
        </div>

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
            {task.scheduledDurationInDays != null
              ? `${formatDays(task.scheduledDurationInDays)} (min. ${task.minimumDurationInDays ?? 0})`
              : "Kan ikke beregnes"}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.counters}>
          <span
            className={styles.counter}
            title={
              employeeNames.length > 0
                ? `Medarbejdere: ${employeeNames.join(", ")}`
                : "Ingen medarbejdere tildelt"
            }
          >
            <FiUsers size={14} />
            {employeeNames.length}
          </span>

          {predecessorNames.length > 0 && (
            <span
              className={styles.counter}
              title={`Afhænger af: ${predecessorNames.join(", ")}`}
            >
              <FiLink size={14} />
              {predecessorNames.length}
            </span>
          )}
        </div>

        <span className={styles.openLink}>
          <span className={styles.openText}>Se detaljer</span>
          <FiChevronRight size={18} />
        </span>
      </div>
    </button>
  );
};

export default TaskCard;

import styles from "./TaskDetail.module.css";
import BackButton from "@/shared/components/ui/BackButton/BackButton";
import { formatDate } from "@/utils/dateHelpers";

const TaskDetail = ({ task, children }) => {
  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{task.name}</h1>
            <Badge status={task.status} />
          </div>
          <p className={styles.description}>{task.estimate} estimered timer på opgave</p>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>
            <span className={styles.value}>{formatDate(task?.createdAt)}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Senest opdateret</span>
            <span className={styles.value}>
              {stage.updatedAt ? formatDate(task.updatedAt) : "Aldrig"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}></div>

      {children && <div className={styles.actionsGroup}>{children}</div>}
    </div>
  );
};

export default TaskDetail;

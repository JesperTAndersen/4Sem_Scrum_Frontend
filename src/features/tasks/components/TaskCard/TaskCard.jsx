import Badge from "@/shared/components/ui/Badge/Badge";


const TaskCard = (task) => {

  if (!task) return null;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.taskName}>{task.name}</span>
        <h4 className={styles.status}><Badge status={task.status || "NOT_STARTED"} /></h4>
        <p className={styles.description}>Estimeret tid: {task.estimate || 0} timer</p>
        <p className={styles.description}>Kompetence: {task?.competence?.name}</p>
      </div>
      
    </div>
  );
};

export default TaskCard;
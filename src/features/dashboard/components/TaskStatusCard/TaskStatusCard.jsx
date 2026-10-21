import styles from "../shared/DashboardCards.module.css";
import Card from "@/shared/components/ui/Card/Card";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import TaskProgress from "@/features/tasks/components/TaskProgress/TaskProgress";

const TaskStatusCard = ({ cols, tasks, isLoading }) => {
  const { notStarted = 0, inProgress = 0, done = 0 } = tasks ?? {};
  const total = notStarted + inProgress + done;

  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Opgavestatus</h3>
          <span className={styles.cardSubtitle}>
            Opgaver i aktive projekter
          </span>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter opgavestatus..." inline />
      ) : total === 0 ? (
        <p className={styles.emptyText}>Ingen opgaver endnu</p>
      ) : (
        <TaskProgress
          done={done}
          inProgress={inProgress}
          notStarted={notStarted}
        />
      )}
    </Card>
  );
};

export default TaskStatusCard;

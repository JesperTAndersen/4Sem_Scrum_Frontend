import { useNavigate } from "react-router";
import styles from "./ProjectDetailBar.module.css";
import Badge from "@/shared/components/ui/Badge/Badge";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import { formatDate } from "@/utils/dateHelpers";
import getFeasibilityStatus from "../../utils/getFeasibilityStatus";
import { formatUserRole } from "@/utils/formatters";
import SectionHeader from "@/shared/components/layout/SectionHeader/SectionHeader";
import TaskProgress from "@/features/tasks/components/TaskProgress/TaskProgress";

const ProjectDetailBar = ({ project, users = [] }) => {
  const navigate = useNavigate();

  const {
    taskDone = 0,
    tasksInProgress = 0,
    tasksNotStarted = 0,
  } = project?.tasks ?? {};

  const allTasks = project?.stages?.flatMap((stage) => stage.tasks ?? []) ?? [];
  const staffedTaskCount = allTasks.filter(
    (task) => task.staffingStatus === "STAFFED",
  ).length;

  return (
    <div className={styles.container}>
      <SectionHeader
        title="Overblik"
        description="Projektets nøgletal, opgavestatus, bemanding og projektledere."
      />
      <div className={styles.group}>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.label}>Deadline</span>

            <span className={styles.summaryValue}>
              {project?.deadline ? formatDate(project.deadline) : "-"}
            </span>

            {project?.schedule && (
              <Badge status={getFeasibilityStatus(project.schedule)} />
            )}
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>Forventet afslutning</span>

            <span className={styles.summaryValue}>
              {project?.schedule?.calculatedFinishDate
                ? formatDate(project.schedule.calculatedFinishDate)
                : "-"}
            </span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>Estimeret tid</span>

            <span className={styles.summaryValue}>
              {project?.totalEstimatedHours ?? 0} timer
            </span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>Estimeret omkostning</span>

            <span className={styles.summaryValue}>
              {(project?.totalCost ?? 0).toLocaleString("da-DK")} kr.
            </span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>Bemanding</span>

            <span className={styles.summaryValue}>
              {staffedTaskCount} af {allTasks.length} opgaver bemandet
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <TaskProgress
          title="Fremdrift"
          done={taskDone}
          inProgress={tasksInProgress}
          notStarted={tasksNotStarted}
        />
      </div>

      <div className={styles.group}>
        <div className={styles.detailsGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>

            <span className={styles.value}>
              {project?.createdAt ? formatDate(project.createdAt) : "-"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Startdato</span>

            <span className={styles.value}>
              {project?.startDate ? formatDate(project.startDate) : "-"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Senest opdateret</span>

            <span className={styles.value}>
              {project?.updatedAt ? formatDate(project.updatedAt) : "Aldrig"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupLabel}>
          Tilknyttede projektledere ({users.length})
        </h3>

        {users.length === 0 ? (
          <p className={styles.emptyText}>
            Ingen projektledere er tilknyttet dette projekt endnu.
          </p>
        ) : (
          <div className={styles.userList}>
            {users.map((user) => (
              <div
                key={user.id}
                className={styles.userItem}
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  size="md"
                />

                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    {user.firstName} {user.lastName}
                  </span>

                  {user.role && (
                    <span className={styles.userRole}>
                      {formatUserRole(user.role)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailBar;

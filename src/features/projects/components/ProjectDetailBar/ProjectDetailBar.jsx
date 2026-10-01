import { useNavigate } from "react-router";
import styles from "./ProjectDetailBar.module.css";
import BackButton from "@/shared/components/ui/BackButton/BackButton";
import Badge from "@/shared/components/ui/Badge/Badge";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import { formatDate } from "@/utils/dateHelpers";
import { formatUserRole } from "@/utils/formatters";

const ProjectDetailBar = ({ project, users = [], children }) => {
  const navigate = useNavigate();

  const {
    totalTaskCount = 0,
    taskDone = 0,
    tasksInProgress = 0,
    tasksNotStarted = 0,
  } = project?.tasks ?? {};

  const progressPercent =
    totalTaskCount > 0
      ? Math.round((taskDone / totalTaskCount) * 100)
      : 0;

  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.headerContent}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{project?.title}</h1>

              <Badge status={project?.status} />
            </div>

            {project?.description && (
              <p className={styles.description}>
                {project.description}
              </p>
            )}
          </div>

          {children && (
            <div className={styles.headerActions}>
              {children}
            </div>
          )}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.label}>Deadline</span>

            <span className={styles.summaryValue}>
              {project?.deadline
                ? formatDate(project.deadline)
                : "-"}
            </span>

            {project?.schedule && (
              <Badge
                status={
                  project.schedule.feasible
                    ? "FEASIBLE"
                    : "INFEASIBLE"
                }
              />
            )}
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>
              Forventet afslutning
            </span>

            <span className={styles.summaryValue}>
              {project?.schedule?.calculatedFinishDate
                ? formatDate(
                    project.schedule.calculatedFinishDate,
                  )
                : "-"}
            </span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>
              Estimeret tid
            </span>

            <span className={styles.summaryValue}>
              {project?.totalEstimatedHours ?? 0} timer
            </span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.label}>
              Estimeret omkostning
            </span>

            <span className={styles.summaryValue}>
              {(project?.totalCost ?? 0).toLocaleString(
                "da-DK",
              )}{" "}
              kr.
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.progressHeader}>
          <div>
            <h3 className={styles.groupTitle}>
              Fremdrift
            </h3>

            <span className={styles.progressText}>
              {taskDone} ud af {totalTaskCount} opgaver færdige
            </span>
          </div>

          <span className={styles.progressPercent}>
            {progressPercent}%
          </span>
        </div>

        <progress
          className={styles.progress}
          value={taskDone}
          max={totalTaskCount || 1}
          aria-label={`${taskDone} ud af ${totalTaskCount} opgaver færdige`}
        />

        <div className={styles.taskStats}>
          <div className={styles.taskStat}>
            <span className={styles.taskStatValue}>
              {taskDone}
            </span>

            <span className={styles.taskStatLabel}>
              Færdige
            </span>
          </div>

          <div className={styles.taskStat}>
            <span className={styles.taskStatValue}>
              {tasksInProgress}
            </span>

            <span className={styles.taskStatLabel}>
              I gang
            </span>
          </div>

          <div className={styles.taskStat}>
            <span className={styles.taskStatValue}>
              {tasksNotStarted}
            </span>

            <span className={styles.taskStatLabel}>
              Ikke startet
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.detailsGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>

            <span className={styles.value}>
              {project?.createdAt
                ? formatDate(project.createdAt)
                : "-"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Startdato</span>

            <span className={styles.value}>
              {project?.startDate
                ? formatDate(project.startDate)
                : "-"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>
              Senest opdateret
            </span>

            <span className={styles.value}>
              {project?.updatedAt
                ? formatDate(project.updatedAt)
                : "Aldrig"}
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
                onClick={() =>
                  navigate(`/users/${user.id}`)
                }
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
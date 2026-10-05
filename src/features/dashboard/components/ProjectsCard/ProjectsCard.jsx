import styles from "../shared/DashboardCards.module.css";

import Card from "@/shared/components/ui/Card/Card";
import Badge from "@/shared/components/ui/Badge/Badge";
import SeeAllLink from "@/shared/components/ui/SeeAllLink/SeeAllLink";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

import { formatDate } from "@/utils/dateHelpers";

const ProjectsCard = ({
  cols,
  projects = [],
  isLoading,
  onView,
}) => {
  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Projekter</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner
          text="Henter projekter..."
          inline
        />
      ) : projects.length === 0 ? (
        <p className={styles.emptyText}>
          Ingen projekter
        </p>
      ) : (
        <div className={styles.listContainer}>
          {projects.map((project) => {
            const taskCount = project?.taskCountDTO ?? {};

            const taskDone = taskCount.taskDone ?? 0;

            const totalTaskCount =
              taskCount.totalTaskCount ?? 0;

            const isFeasible =
              project?.schedule?.feasible;

            return (
              <div
                key={project.id}
                className={`${styles.listItem} ${styles.clickable}`}
                onClick={() => onView?.(project.id)}
              >
                <div className={styles.itemInfo}>
                  <div className={styles.itemHeader}>
                    <h4 className={styles.itemName}>
                      {project.title}
                    </h4>

                    <Badge status={project.status} />
                  </div>

                  <div className={styles.projectMeta}>
                    <span>
                      {taskDone}/{totalTaskCount} færdige
                    </span>

                    {project.schedule && !isFeasible && (
                      <>
                        <span className={styles.separator}>
                          ·
                        </span>

                        <Badge status="INFEASIBLE" />

                        <span className={styles.separator}>
                          ·
                        </span>

                        <span>
                          Forventet{" "}
                          {project.schedule.calculatedFinishDate
                            ? formatDate(
                                project.schedule
                                  .calculatedFinishDate,
                              )
                            : "-"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.footer}>
        <SeeAllLink
          text="Gå til projekter"
          to="/projects"
        />
      </div>
    </Card>
  );
};

export default ProjectsCard;
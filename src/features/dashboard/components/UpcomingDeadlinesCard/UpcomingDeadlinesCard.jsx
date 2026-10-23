import styles from "../shared/DashboardCards.module.css";
import Card from "@/shared/components/ui/Card/Card";
import Badge from "@/shared/components/ui/Badge/Badge";
import SeeAllLink from "@/shared/components/ui/SeeAllLink/SeeAllLink";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import { formatShortDate } from "@/utils/dateHelpers";
import getFeasibilityStatus from "@/features/projects/utils/getFeasibilityStatus";

const UpcomingDeadlinesCard = ({ cols, projects = [], isLoading, onView }) => {
  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Kommende deadlines</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter deadlines..." inline />
      ) : projects.length === 0 ? (
        <p className={styles.emptyText}>Ingen kommende deadlines</p>
      ) : (
        <div className={styles.listContainer}>
          {projects.map((project) => (
            <div
              key={project.projectId}
              className={`${styles.listItem} ${styles.clickable}`}
              onClick={() => onView?.(project.projectId)}
            >
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemName}>{project.title}</h4>
                  <Badge status={getFeasibilityStatus(project)} />
                </div>

                <div className={styles.projectMeta}>
                  <span>Deadline {formatShortDate(project.deadline)}</span>
                  <span className={styles.separator}>·</span>
                  <span>
                    Forventet{" "}
                    {project.calculatedFinishDate
                      ? formatShortDate(project.calculatedFinishDate)
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <SeeAllLink text="Gå til projekter" to="/projects" />
      </div>
    </Card>
  );
};

export default UpcomingDeadlinesCard;

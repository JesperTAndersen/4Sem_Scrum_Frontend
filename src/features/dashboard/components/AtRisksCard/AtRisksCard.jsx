import styles from "../shared/DashboardCards.module.css";
import Card from "@/shared/components/ui/Card/Card";
import Badge from "@/shared/components/ui/Badge/Badge";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import { formatShortDate } from "@/utils/dateHelpers";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const getDaysLate = (deadline, calculatedFinishDate) =>
  Math.round(
    (new Date(calculatedFinishDate) - new Date(deadline)) /
      MILLISECONDS_PER_DAY,
  );

const AtRisksCard = ({ cols, projects = [], isLoading, onView }) => {
  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Projekter i risiko</h3>
        {!isLoading && projects.length > 0 && (
          <Badge status="INFEASIBLE" label={projects.length} />
        )}
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter projekter..." inline />
      ) : projects.length === 0 ? (
        <p className={styles.emptyText}>Alle aktive projekter kan nås</p>
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
                  <Badge status="INFEASIBLE" />
                </div>

                <div className={styles.projectMeta}>
                  <span>Deadline {formatShortDate(project.deadline)}</span>
                  <span className={styles.separator}>·</span>
                  <span>
                    Forventet {formatShortDate(project.calculatedFinishDate)}
                  </span>
                  <span className={styles.separator}>·</span>
                  <span>
                    {getDaysLate(
                      project.deadline,
                      project.calculatedFinishDate,
                    )}{" "}
                    dage for sent
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AtRisksCard;

import styles from "../shared/DashboardCards.module.css";
import statusStyles from "./ProjectStatusCard.module.css";
import Card from "@/shared/components/ui/Card/Card";
import Badge from "@/shared/components/ui/Badge/Badge";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const STATUSES = ["DRAFT", "PLANNED", "IN_PROGRESS", "COMPLETED"];

const ProjectStatusCard = ({ cols, projects, isLoading, onSelectStatus }) => {
  const total = projects?.total ?? 0;
  const byStatus = projects?.byStatus ?? {};

  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Projekter pr. status</h3>
          <span className={styles.cardSubtitle}>
            Alle projekter, også afsluttede
          </span>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter projektstatus..." inline />
      ) : total === 0 ? (
        <p className={styles.emptyText}>Ingen projekter endnu</p>
      ) : (
        <div className={statusStyles.statusGrid}>
          {STATUSES.map((status) => (
            <div
              key={status}
              className={`${statusStyles.statusTile} ${styles.clickable}`}
              onClick={() => onSelectStatus?.(status)}
            >
              <span className={statusStyles.count}>
                {byStatus[status] ?? 0}
              </span>
              <Badge status={status} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ProjectStatusCard;

import styles from "../shared/DashboardCards.module.css";
import Card from "@/shared/components/ui/Card/Card";
import Badge from "@/shared/components/ui/Badge/Badge";
import SeeAllLink from "@/shared/components/ui/SeeAllLink/SeeAllLink";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const ProjectsCard = ({ cols, projects = [], isLoading }) => {
  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Projekter</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter projekter..." inline />
      ) : projects.length === 0 ? (
        <p className={styles.emptyText}>Ingen projekter</p>
      ) : (
        <div className={styles.listContainer}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles.listItem} ${styles.clickable}`}
            >
              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{project.title}</h4>
                <p className={styles.itemSubtext}>
                  {project.doneTaskCount} af {project.taskCount}{" "}
                  opgaver færdige
                </p>
              </div>
              <Badge status={project.status} />
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

export default ProjectsCard;

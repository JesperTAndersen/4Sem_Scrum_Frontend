import styles from "./ProjectDetailBar.module.css";
import Badge from "@/shared/components/ui/Badge/Badge";
import BackButton from "@/shared/components/ui/BackButton/BackButton";

const ProjectHeader = ({ project }) => {
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
              <p className={styles.description}>{project.description}</p>
            )}
          </div>

          {children && <div className={styles.headerActions}>{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

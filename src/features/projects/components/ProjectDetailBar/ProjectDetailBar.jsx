import { useNavigate } from "react-router";
import styles from "./ProjectDetailBar.module.css";
import BackButton from "@/shared/components/ui/BackButton/BackButton";

const ProjectDetailBar = ( {project, users = [], children} ) => {

    const navigate = useNavigate();

    return (
            <div className={styles.container}>
      <BackButton />

            <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{project.title}</h1>
          <Badge status={project.status} />
        </div>

        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
      </div>

      <div className={styles.group}>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>
            <span className={styles.value}>
              {formatDate(project.createdAt)}
            </span>
          </div>

                    <div className={styles.field}>
            <span className={styles.label}>Deadline</span>
            <span className={styles.value}>
              {formatDate(project.deadline)}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Senest opdateret</span>
            <span className={styles.value}>
              {project.updatedAt ? formatDate(project.updatedAt) : 'Aldrig'}
            </span>
          </div>

                    <div className={styles.field}>
            <span className={styles.label}>Total estimeret timer</span>
            <span className={styles.value}>
              {project?.totalEstimatedHours ?? 0}
            </span>
          </div>

                    <div className={styles.field}>
            <span className={styles.label}>Opgaver</span>
            <span className={styles.value}>
              {p?.completedTasks ?? 0} ud af {p?.totalTasks ?? 0} færdige
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
                  <span className={styles.userRole}>
                    {formatUserRole(user.userRole)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {children && <div className={styles.actionsGroup}>{children}</div>}
    </div>
        
    )



}

export default ProjectDetailBar;

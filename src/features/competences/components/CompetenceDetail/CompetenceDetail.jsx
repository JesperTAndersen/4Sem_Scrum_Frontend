import styles from "./CompetenceDetail.module.css";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import BackButton from "@/shared/components/ui/BackButton/BackButton";
import Badge from "@/shared/components/ui/Badge/Badge";
import { formatDate } from "@/utils/dateHelpers";
import { formatUserRole } from "@/utils/formatters";
import { useNavigate } from "react-router";

const CompetenceDetail = ({ competence, users = [], actions }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{competence.name}</h1>
            <Badge status={competence.active ? "ACTIVE" : "DISABLED"} />
          </div>
          <p className={styles.description}>{competence.rate} kr. i timen</p>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>
            <span className={styles.value}>
              {formatDate(competence?.createdAt)}
            </span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Senest opdateret</span>
            <span className={styles.value}>
              {competence.updatedAt
                ? formatDate(competence.updatedAt)
                : "Aldrig"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupLabel}>
          Tilknyttede medarbejdere ({users.length})
        </h3>

        {users.length === 0 ? (
          <p className={styles.emptyText}>
            Ingen medarbejdere er tilknyttet denne kompetence endnu.
          </p>
        ) : (
          <div className={styles.userList}>
            {users.map((user) => (
              <div
                key={user.id}
                className={styles.userItem}
                onClick={() => navigate(`/admin/users/${user.id}`)}
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

      {actions && (
        <div className={styles.actionsGroup}>
          <div className={styles.actionsLeft}>{actions.left}</div>

          <div className={styles.actionsRight}>{actions.right}</div>
        </div>
      )}
    </div>
  );
};

export default CompetenceDetail;

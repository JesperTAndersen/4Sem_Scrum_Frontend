import styles from "./UserDetail.module.css";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import BackButton from "@/shared/components/ui/BackButton/BackButton";
import { formatDate } from "@/utils/dateHelpers";
import { formatUserRole } from "@/utils/formatters";

const UserDetail = ({ user, children }) => {
  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <Avatar
          firstName={user?.firstName.charAt(0)}
          lastName={user?.lastName.charAt(0)}
          size="lg"
        />
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            {user.firstName} {user.lastName}
          </h1>
          <span className={styles.roleBadge}>
            {formatUserRole(user.userRole)}
          </span>
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupLabel}>Brugerinformation</h3>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user.email}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Rolle</span>
            <span className={styles.value}>
              {formatUserRole(user.userRole)}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>
            <span className={styles.value}>{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>

      {children && <div className={styles.actionsGroup}>{children}</div>}
    </div>
  );
};

export default UserDetail;

import styles from "./EmployeeDetail.module.css";
import BackButton from "@/shared/components/ui/BackButton/BackButton";
import Badge from "@/shared/components/ui/Badge/Badge";
import CompetenceIcon from "@/features/competences/components/CompetenceIcon/CompetenceIcon";
import { formatDate } from "@/utils/dateHelpers";

const EmployeeDetail = ({ employee, actions }) => {

  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{employee.firstName} {employee.lastName}</h1>
            <Badge status={employee.active ? "ACTIVE" : "DISABLED"} />
          </div>
          <p className={styles.description}>{employee.dailyCapacity} i daglig kapicitet</p>
        </div>
      </div>

            {employee.competences?.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupLabel}>Tilknyttede kompetencer</h3>

          <div className={styles.competenceGrid}>
            {employee.competences
              .slice()
              .map((c) => (
                <div key={c.id} className={styles.competenceItem}>
                  <CompetenceIcon displayNumber={c.displayNumber} size="sm" />
                  <div className={styles.competenceText}>
                    <span className={styles.competenceName}>{c.name}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className={styles.group}>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>
            <span className={styles.value}>
              {formatDate(employee?.createdAt)}
            </span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Senest opdateret</span>
            <span className={styles.value}>
              {employee.updatedAt ? formatDate(employee.updatedAt) : "Aldrig"}
            </span>
          </div>
        </div>
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

export default EmployeeDetail;

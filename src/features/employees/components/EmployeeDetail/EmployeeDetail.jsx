import styles from "./EmployeeDetail.module.css";
import BackButton from "@/shared/components/ui/BackButton/BackButton";
import Badge from "@/shared/components/ui/Badge/Badge";
import CompetenceIcon from "@/features/competences/components/CompetenceIcon/CompetenceIcon";
import Button from "@/shared/components/ui/Button/Button";
import { formatDate } from "@/utils/dateHelpers";
import { FiEdit2 } from "react-icons/fi";

const EmployeeDetail = ({ employee, actions, onEditCompetences }) => {
  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {employee.firstName} {employee.lastName}
            </h1>
            <Badge status={employee.active ? "ACTIVE" : "DISABLED"} />
          </div>
          <p className={styles.description}>
            {employee.dailyCapacity?.toLocaleString("da-DK")} timer i daglig
            kapacitet
            {employee.standardCapacity && " (standard)"}
          </p>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.groupHeader}>
          <h3 className={styles.groupLabel}>Tilknyttede kompetencer</h3>

          {onEditCompetences && (
            <Button
              icon={<FiEdit2 size={14} />}
              name="Rediger"
              variant="ghost"
              onClick={onEditCompetences}
            />
          )}
        </div>

        {employee.competences?.length > 0 ? (
          <div className={styles.competenceGrid}>
            {employee.competences.map((c) => (
              <div key={c.id} className={styles.competenceItem}>
                <CompetenceIcon name={c.name} size="sm" />
                <div className={styles.competenceText}>
                  <span className={styles.competenceName}>{c.name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>
            Medarbejderen har ingen kompetencer endnu.
          </p>
        )}
      </div>

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
              {employee.updateAt ? formatDate(employee.updateAt) : "Aldrig"}
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

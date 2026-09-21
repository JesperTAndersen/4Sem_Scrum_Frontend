import styles from "./CompetenceDetail.module.css";
import BackButton from "@/shared/components/ui/BackButton/BackButton";

const StageDetail = ({ stage, children }) => {
  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{stage.name}</h1>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Oprettet</span>
            <span className={styles.value}>{formatDate(stage?.createdAt)}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Senest opdateret</span>
            <span className={styles.value}>
              {stage.updatedAt ? formatDate(stage.updatedAt) : "Aldrig"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.group}></div>

      {children && <div className={styles.actionsGroup}>{children}</div>}
    </div>
  );
};

export default StageDetail;

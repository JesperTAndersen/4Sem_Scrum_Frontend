import styles from "./SectionHeader.module.css";

const SectionHeader = ({ title, description, children }) => {
  return (
    <div className={styles.header}>
      <div>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}
      </div>

      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
};

export default SectionHeader;

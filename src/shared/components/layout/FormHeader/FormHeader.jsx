import styles from "./FormHeader.module.css";

const FormHeader = ({ title, subtitle }) => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default FormHeader;

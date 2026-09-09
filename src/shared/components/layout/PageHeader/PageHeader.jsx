import styles from './PageHeader.module.css';

const PageHeader = ({ title, subtitle }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default PageHeader;

import styles from "./FormLayout.module.css";

const FormLayout = ({ children, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormLayout;

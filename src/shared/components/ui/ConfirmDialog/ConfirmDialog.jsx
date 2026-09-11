import styles from "./ConfirmDialog.module.css";
import Button from "../Button/Button";

const ConfirmDialog = ({
  title = "Bekræft handling",
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p className={styles.message}>{message}</p>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.actions}>
          <Button name="Fortryd" onClick={onCancel} variant="secondary" />
          <Button name="Ja, bekræft" onClick={onConfirm} variant="danger" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

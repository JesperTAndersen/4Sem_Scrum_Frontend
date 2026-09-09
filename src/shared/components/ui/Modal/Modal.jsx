import styles from "./Modal.module.css";

const Modal = ({ children, onClose, className }) => {
  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={`${styles.modal} ${className ?? ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

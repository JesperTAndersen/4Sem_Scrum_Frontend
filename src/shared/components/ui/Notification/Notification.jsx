import styles from "./Notification.module.css";

const Notification = ({ message, type = "success", inline = false }) => {
  if (!message) return null;

  return (
    <div
      className={`${styles.notification} ${styles[type]} ${inline ? styles.inline : ""}`}
    >
      {message}
    </div>
  );
};

export default Notification;

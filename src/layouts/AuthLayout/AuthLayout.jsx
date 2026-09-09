import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router";
import { useNotification } from "../../context/NotificationContext";
import Notification from "../../components/ui/Notification/Notification";
import { useAuth } from "../../context/AuthContext";

const AuthLayout = () => {
  const { notification } = useNotification();
  const { authMessage } = useAuth();

  return (
    <div className={styles.splitContainer}>
      <div className={styles.formSide}>
        <div className={styles.formWrapper}>
          {authMessage && (
            <Notification message={authMessage} type="error" inline />
          )}
          <Notification
            type={notification?.type}
            message={notification?.message}
          />
          <Outlet />
        </div>
      </div>

      <div className={styles.imageSide}></div>
    </div>
  );
};

export default AuthLayout;

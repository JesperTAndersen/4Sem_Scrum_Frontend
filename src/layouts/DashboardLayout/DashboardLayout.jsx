import styles from "./DashboardLayout.module.css";
import { Outlet } from "react-router";
import Sidebar from "@/shared/components/layout/Sidebar/Sidebar";
import TopBar from "@/shared/components/layout/TopBar/TopBar";
import Notification from "@/shared/components/ui/Notification/Notification";
import { useNotification } from "@/context/NotificationContext";

const DashboardLayout = () => {
  const { notification } = useNotification();

  return (
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.mainArea}>
        <TopBar snapshot={3} />
        <div className={styles.pageContent}>
          <Notification
            type={notification?.type}
            message={notification?.message}
          />
          <Outlet context={{}} />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;

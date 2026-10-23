import styles from "./DashboardLayout.module.css";
import { Outlet, useLocation } from "react-router";
import Sidebar from "@/shared/components/layout/Sidebar/Sidebar";
import TopBar from "@/shared/components/layout/TopBar/TopBar";
import Notification from "@/shared/components/ui/Notification/Notification";
import { useNotification } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import workloadService from "@/features/planning/services/workloadService";
import { getNextFourWeeks } from "@/utils/dateHelpers";

const DashboardLayout = () => {
  const { notification } = useNotification();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [workloadWarnings, setWorkloadWarnings] = useState(null);

  useEffect(() => {
    if (user?.role !== "PROJECT_MANAGER") {
      return;
    }

    const fetchWarnings = async () => {
      try {
        const { startDate, endDate } = getNextFourWeeks();
        const data = await workloadService.getOverAllocations(
          startDate,
          endDate,
        );
        setWorkloadWarnings(data);
      } catch {
        setWorkloadWarnings(null);
      }
    };
    fetchWarnings();
  }, [pathname, user]);

  return (
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.mainArea}>
        <TopBar workloadWarnings={workloadWarnings} />
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

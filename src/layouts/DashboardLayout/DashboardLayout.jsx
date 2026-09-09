import styles from './AdminLayout.module.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import AdminTopBar from '../../components/layout/AdminTopBar/AdminTopBar';
import Notification from '../../components/ui/Notification/Notification';

const AdminLayout = () => {
  const { notification } = useNotification();

  return (
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.mainArea}>
        <AdminTopBar snapshot={snapshot} />
        <div className={styles.pageContent}>
          <Notification
            type={notification?.type}
            message={notification?.message}
          />
          <Outlet
            context={{

            }}
          />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
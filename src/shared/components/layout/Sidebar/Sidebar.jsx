import styles from './Sidebar.module.css';
import LogoContainer from './LogoContainer/LogoContainer';
import Search from './Search/Search';
import RouteSelect from './RouteSelect/RouteSelect';
import SidebarFooter from './SidebarFooter/SidebarFooter';
import { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarContainer}>
        <LogoContainer collapsed={collapsed} />
        <Search collapsed={collapsed} />
        <RouteSelect collapsed={collapsed} />
        <SidebarFooter collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
    </aside>
  );
};

export default Sidebar;

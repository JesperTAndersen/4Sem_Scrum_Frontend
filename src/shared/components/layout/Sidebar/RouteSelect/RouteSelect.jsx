import { NavLink } from "react-router";
import styles from "./RouteSelect.module.css";
import {
  FiGrid,
  FiFolder,
  FiTool,
  FiUsers,
  FiUserCheck,
} from "react-icons/fi";

const RouteSelect = ({ collapsed }) => {
  return (
    <div className={styles.routeContainer}>
      <Route
        to="/dashboard"
        title="Dashboard"
        Icon={FiGrid}
        collapsed={collapsed}
      />

      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>Planlægning</h4>
        </div>
      )}
      <Route
        to="/projects"
        title="Projekter"
        Icon={FiFolder}
        collapsed={collapsed}
      />

      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>Ressourcer</h4>
        </div>
      )}
      <Route
        to="/employees"
        title="Medarbejdere"
        Icon={FiUserCheck}
        collapsed={collapsed}
      />
      <Route
        to="/competences"
        title="Kompetencer"
        Icon={FiTool}
        collapsed={collapsed}
      />

      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>System</h4>
        </div>
      )}
      <Route to="/users" title="Brugere" Icon={FiUsers} collapsed={collapsed} />
    </div>
  );
};

const Route = ({ to, Icon, title, collapsed }) => {
  return (
    <NavLink
      to={to}
      title={collapsed ? title : undefined}
      className={({ isActive }) =>
        `${styles.routeItem} ${collapsed ? styles.routeItemCollapsed : ""} ${isActive ? styles.active : ""}`
      }
    >
      <Icon />
      {!collapsed && <span>{title}</span>}
    </NavLink>
  );
};

export default RouteSelect;

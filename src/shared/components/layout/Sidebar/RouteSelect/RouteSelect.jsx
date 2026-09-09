import { NavLink } from "react-router-dom";
import styles from "./RouteSelect.module.css";
import {
  FiGrid,
  FiZap,
  FiCompass,
  FiLayers,
  FiUsers,
  FiCalendar,
  FiClipboard,
  FiShoppingCart,
  FiAlertTriangle,
  FiPackage,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";

const RouteSelect = ({ collapsed }) => {
  return (
    <div className={styles.routeContainer}>
      <Route
        to="/admin/dashboard"
        title="Dashboard"
        Icon={FiGrid}
        collapsed={collapsed}
      />

      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>Menu og Mad</h4>
        </div>
      )}
      <Route
        to="/admin/dish-suggestions"
        title="Forslag"
        Icon={FiZap}
        collapsed={collapsed}
      />
      <Route
        to="/admin/menu-inspirations"
        title="Inspiration"
        Icon={FiCompass}
        collapsed={collapsed}
      />
      <Route
        to="/admin/dishes"
        title="Retter"
        Icon={FiLayers}
        collapsed={collapsed}
      />
      <Route
        to="/admin/menus"
        title="Ugemenuer"
        Icon={FiCalendar}
        collapsed={collapsed}
      />
      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>Indkøb</h4>
        </div>
      )}
      <Route
        to="/admin/ingredient-requests"
        title="Vareanmodninger"
        Icon={FiClipboard}
        collapsed={collapsed}
      />
      <Route
        to="/admin/shopping-lists"
        title="Indkøbsliste"
        Icon={FiShoppingCart}
        collapsed={collapsed}
      />
      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>Takeaway</h4>
        </div>
      )}
      <Route
        to="/admin/takeaway"
        title="Takeaway-tilbud"
        Icon={FiPackage}
        collapsed={collapsed}
      />
      <Route
        to="/admin/takeaway-orders"
        title="Takeaway-ordrer"
        Icon={FiFileText}
        collapsed={collapsed}
      />
      {!collapsed && (
        <div className={styles.routesHeader}>
          <h4>System</h4>
        </div>
      )}
      <Route
        to="/admin/users"
        title="Brugere"
        Icon={FiUsers}
        collapsed={collapsed}
      />
      <Route
        to="/admin/stations"
        title="Stationer"
        Icon={FiMapPin}
        collapsed={collapsed}
      />
      <Route
        to="/admin/allergens"
        title="Allergener"
        Icon={FiAlertTriangle}
        collapsed={collapsed}
      />
    </div>
  );
};

const Route = ({ to, Icon, title, collapsed }) => {
  return (
    <NavLink
      to={to}
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

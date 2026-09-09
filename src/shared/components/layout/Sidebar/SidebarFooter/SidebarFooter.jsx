import styles from './SidebarFooter.module.css';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const SidebarFooter = ({ collapsed, onToggle }) => {
  return (
    <div className={styles.footer}>
      <button className={styles.toggleButton} onClick={onToggle}>
        {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        {!collapsed && <span>Minimer menu</span>}
      </button>
    </div>
  );
};

export default SidebarFooter;

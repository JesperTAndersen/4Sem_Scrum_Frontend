import styles from "./TableSearch.module.css";
import { FiSearch } from "react-icons/fi";

const TableSearch = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchWrapper}>
      <FiSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default TableSearch;

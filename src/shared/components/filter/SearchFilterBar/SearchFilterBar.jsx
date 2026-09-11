import styles from "./SearchFilterBar.module.css";
import { FiSearch } from "react-icons/fi";

const SearchFilterBar = ({
  filter,
  onChange,
  options = [],
  valueKey = "status",
  searchKey = "search",
  placeholder = "Søg...",
  layout = "column",
}) => {
  return (
    <div
      className={`${styles.container} ${layout === "row" ? styles.row : ""}`}
    >
      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.option} ${filter[valueKey] === option.value ? styles.activeOption : ""}`}
            onClick={() => onChange(valueKey, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.searchWrapper}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder={placeholder}
          value={filter[searchKey] ?? ""}
          onChange={(e) => onChange(searchKey, e.target.value)}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchFilterBar;

import styles from "./Select.module.css";
import { FiChevronsDown } from "react-icons/fi";

const Select = ({
  label,
  value,
  name,
  onChange,
  options = [],
  placeholder = "-- Vælg --",
  required,
  hasError,
  errorMessage,
  disabled,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.labelWrapper}>
        {label && <span className={styles.labelText}>{label}</span>}

        <div className={styles.selectWrapper}>
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`${styles.selectField} ${hasError ? styles.errorField : ""}`}
          >
            {placeholder && <option value="">{placeholder}</option>}

            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FiChevronsDown className={styles.chevronIcon} size={18} />
        </div>
      </label>

      {hasError && errorMessage && (
        <span className={styles.errorText}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;

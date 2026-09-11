import styles from "./Select.module.css";

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

        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`${styles.selectField} ${hasError ? styles.errorField : ""}`}
        >
          <option value="">{placeholder}</option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      {hasError && errorMessage && (
        <span className={styles.errorText}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;

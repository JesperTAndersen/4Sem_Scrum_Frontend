import styles from "./Input.module.css";

const Input = ({
  label,
  type = "text",
  value,
  name,
  min,
  max,
  onChange,
  placeholder = "none",
  required,
  hasError,
  errorMessage,
  icon,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.labelWrapper}>
        {label && <span className={styles.labelText}>{label}</span>}

        <div className={styles.inputWrapper}>
          {icon && <span className={styles.inputIcon}>{icon}</span>}
          <input
            type={type}
            name={name}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={`${styles.inputField} ${icon ? styles.withIcon : ""} ${
              hasError ? styles.errorField : ""
            }`}
          />
        </div>
      </label>

      {hasError && errorMessage && (
        <span className={styles.errorText}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;

import styles from './Input.module.css';

const Textarea = ({
  label,
  value,
  name,
  onChange,
  placeholder = '',
  required,
  hasError,
  errorMessage,
  maxLength,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.labelWrapper}>
        {label && <span className={styles.labelText}>{label}</span>}

        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${styles.inputField} ${
            hasError ? styles.errorField : ''
          }`}
        />

        {maxLength && (
          <small>
            {value.length} / {maxLength}
          </small>
        )}
      </label>

      {hasError && errorMessage && (
        <span className={styles.errorText}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Textarea;

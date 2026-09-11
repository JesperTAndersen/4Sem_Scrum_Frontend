import styles from "../shared/selectStyles.module.css";

const ROLES = [
  { value: "ALL", label: "Alle roller" },
  { value: "EMPLOYEE", label: "Ansatte" },
  { value: "PROJECT_MANAGER", label: "Projekt leder" },
];

const RoleFilter = ({ value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {ROLES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
};

export default RoleFilter;

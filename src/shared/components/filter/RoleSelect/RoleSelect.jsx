import styles from "../shared/selectStyles.module.css";
import { ROLE_OPTIONS } from "../../../utils/constants";

const RoleSelect = ({ value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">-- Vælg rolle --</option>

      {ROLE_OPTIONS.map((role) => (
        <option key={role.value} value={role.value}>
          {role.label}
        </option>
      ))}
    </select>
  );
};

export default RoleSelect;

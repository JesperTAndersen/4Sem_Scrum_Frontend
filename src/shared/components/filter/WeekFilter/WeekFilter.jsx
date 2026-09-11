import styles from "../shared/selectStyles.module.css";
import { getUpcomingWeeks } from "../../../utils/dateHelpers";

const WeekFilter = ({ value, onChange }) => {
  const upcomingWeeks = getUpcomingWeeks(8);

  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="ALL">Alle uger</option>
      {upcomingWeeks.map((weekObj) => (
        <option key={`${weekObj.year}-${weekObj.week}`} value={weekObj.week}>
          {weekObj.label}
        </option>
      ))}
    </select>
  );
};

export default WeekFilter;

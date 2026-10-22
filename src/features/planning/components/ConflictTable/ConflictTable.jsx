import styles from "./ConflictTable.module.css";
import { formatShortDate } from "@/utils/dateHelpers";
import formatHours from "../../utils/formatHours";
import { FiChevronRight } from "react-icons/fi";

const ConflictTable = ({ conflicts = [], onView }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Medarbejder</th>
            <th>Dato</th>
            <th>Tildelt</th>
            <th>Kapacitet</th>
            <th>For meget</th>
          </tr>
        </thead>

        <tbody>
          {conflicts.map((c) => (
            <tr
              key={c.employeeId}
              className={styles.row}
              onClick={() => onView(c.employeeId)}
            >
              <td>
                {c.firstName} {c.lastName}
              </td>

              <td>${formatShortDate(c?.date)}</td>

              <td>{formatHours(c?.allocatedHours)}</td>

              <td>{formatHours(c?.availableHours)}</td>

              <td>{formatHours(c?.excessHours)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConflictTable;

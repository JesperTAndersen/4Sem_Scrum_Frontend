import styles from "./ProjectsTable.module.css";
import { FiChevronRight } from "react-icons/fi";

const AvailabilityTable = ({ employees, onView }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Medarbejder</th>
            <th>Kapacitet</th>
            <th>Tildelt</th>
            <th>Tilbage</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className={styles.row} onClick={() => onView(e.id)}>
              <td>
                {e.firstName} {e.lastName}
              </td>

              <td>{`${e?.dailyCapacity} t/dag`}</td>

              <td>{`${e?.allocatedHours} t`}</td>

              <td>{`${e?.remainingHours} t`}</td>

              <td>
                <FiChevronRight className={styles.chevron} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityTable;

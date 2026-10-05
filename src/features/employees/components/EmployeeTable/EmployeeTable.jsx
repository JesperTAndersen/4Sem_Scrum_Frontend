import styles from "./EmployeeTable.module.css";
import { FiChevronRight } from "react-icons/fi";
import Badge from "@/shared/components/ui/Badge/Badge";

const EmployeeTable = ({ employees, onView }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Timeløn</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className={styles.row} onClick={() => onView(e.id)}>
              <td>{e.name}</td>
              <td>{e.rate}</td>
              <td>
                <Badge status={e.active ? "ACTIVE" : "DISABLED"} />
              </td>
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

export default EmployeeTable;

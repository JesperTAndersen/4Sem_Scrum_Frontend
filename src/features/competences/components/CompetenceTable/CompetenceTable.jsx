import styles from "./CompetenceTable.module.css";
import { FiChevronRight } from "react-icons/fi";
import Badge from "@/shared/components/ui/Badge/Badge";

const CompetenceTable = ({ competences, onView }) => {
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
          {competences.map((c) => (
            <tr key={c.id} className={styles.row} onClick={() => onView(c.id)}>
              <td>{c.name}</td>
              <td>{c.rate}</td>
              <td>
                <Badge status={c.active ? "ACTIVE" : "DISABLED"} />
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

export default CompetenceTable;

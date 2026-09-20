import styles from "./StageItem.module.css";
import Badge from "@/shared/components/ui/Badge/Badge";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import Card from "@/shared/components/ui/Card/Card";

const StageItem = ({ stage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card variant="table">
        <div className={styles.stageHeader} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.titleInfo}>
            <h4>{stage.title}</h4>
            <span className={styles.hours}>
              ({stage.estimatedHours || 0} timer)
            </span>
          </div>

          <div className={styles.headerActions}>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        {isOpen && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Opgave</th>
                  <th>Estimeret tid</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stage.tasks?.map((task) => (
                  <tr
                    key={task.id}
                    className={styles.row}
                    onClick={() => onView(task.id)}
                  >
                    <td>{task.name}</td>
                    <td>{task.estimate}</td>
                    <td>
                      <Badge status={task.status} />
                    </td>
                    <td>
                      <FiChevronRight className={styles.chevron} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
};

export default StageItem;

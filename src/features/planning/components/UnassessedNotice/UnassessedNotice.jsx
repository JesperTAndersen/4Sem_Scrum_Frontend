import styles from "./UnassessedNotice.module.css";
import { useState } from "react";
import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";
import Badge from "@/shared/components/ui/Badge/Badge";
import Button from "@/shared/components/ui/Button/Button";

const REASON_STATUS = {
  STAFFING_REQUIRED: "STAFFING_REQUIRED",
  NO_AVAILABLE_CAPACITY: "NO_AVAILABLE_CAPACITY",
  UNDETERMINED_SCHEDULE: "UNDETERMINED",
};

const UnassessedNotice = ({ tasks = [], scope, consequence }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (tasks.length === 0) return null;

  return (
    <div className={styles.notice}>
      <div className={styles.header}>
        <FiAlertTriangle className={styles.icon} />

        <p className={styles.text}>
          {tasks.length === 1 ? "1 opgave" : `${tasks.length} opgaver`} {scope}{" "}
          kunne ikke vurderes. {consequence}
        </p>

        <Button
          variant="ghost"
          name={isOpen ? "Skjul" : "Vis opgaver"}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {isOpen && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Opgave</th>
              <th>Projekt</th>
              <th>Årsag</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.taskId}>
                <td>{task.taskName}</td>

                <td>
                  <Link to={`/projects/${task.projectId}`}>
                    {task.projectTitle}
                  </Link>
                </td>

                <td>
                  <Badge
                    status={REASON_STATUS[task.reason] ?? "UNDETERMINED"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UnassessedNotice;

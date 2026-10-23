import styles from "./ConflictTable.module.css";
import { Fragment, useState } from "react";
import { Link } from "react-router";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import { formatShortDate } from "@/utils/dateHelpers";
import formatHours from "../../utils/formatHours";
import Button from "@/shared/components/ui/Button/Button";

const ConflictTable = ({ conflicts = [], onOpen, onFindAvailable }) => {
  const [expandedKey, setExpandedKey] = useState(null);

  const handleToggle = (conflict, key) => {
    if (expandedKey === key) {
      setExpandedKey(null);
    } else {
      setExpandedKey(key);
      onOpen?.(conflict);
    }
  };

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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {conflicts.map((c) => {
            const key = `${c.employeeId}-${c.date}`;
            const isOpen = expandedKey === key;

            return (
              <Fragment key={key}>
                <tr className={styles.row} onClick={() => handleToggle(c, key)}>
                  <td>
                    <Link
                      to={`/employees/${c.employeeId}`}
                      className={styles.link}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {c.firstName} {c.lastName}
                    </Link>
                  </td>

                  <td>{formatShortDate(c.date)}</td>

                  <td>{formatHours(c.allocatedHours)}</td>

                  <td>{formatHours(c.availableHours)}</td>

                  <td className={styles.excess}>
                    {formatHours(c.excessHours)}
                  </td>

                  <td>
                    <span className={styles.chevronToggle}>
                      {isOpen ? (
                        <FiChevronUp size={20} />
                      ) : (
                        <FiChevronDown size={20} />
                      )}
                    </span>
                  </td>
                </tr>

                {isOpen &&
                  c.taskHours.map((task) => (
                    <tr key={task.taskId} className={styles.detailRow}>
                      <td colSpan={1}>{task.taskName}</td>

                      <td>{formatHours(task.allocatedHours)}</td>

                      <td colSpan={2}>
                        <Link
                          to={`/projects/${task.projectId}`}
                          className={styles.link}
                        >
                          {task.projectTitle}
                        </Link>
                      </td>

                      <td colSpan={2}>
                        {task.competenceId && (
                          <Button
                            variant="ghost"
                            iconOnly
                            icon={<FiSearch />}
                            title={`Find ledige med ${task.competenceName}`}
                            onClick={() =>
                              onFindAvailable?.(c.date, task.competenceId)
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ConflictTable;

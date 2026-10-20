import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./TaskAssignments.module.css";
import Button from "@/shared/components/ui/Button/Button";
import Badge from "@/shared/components/ui/Badge/Badge";
import Select from "@/shared/components/filter/Select/Select";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import { FiTrash2 } from "react-icons/fi";

const TaskAssignments = ({ task, employees = [], onAdd, onRemove }) => {
  const navigate = useNavigate();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignedEmployees = task.assignedEmployees ?? [];
  const isLocked = task.status === "DONE";
  const competenceName = task.competence?.name;

  const availableEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.active &&
        (!task.competence ||
          employee.competences?.some(
            (competence) => competence.id === task.competence.id,
          )) &&
        !assignedEmployees.some((assigned) => assigned.id === employee.id),
    );
  }, [employees, task.competence, assignedEmployees]);

  const employeeOptions = availableEmployees.map((employee) => ({
    value: employee.id,
    label: `${employee.firstName} ${employee.lastName}`,
  }));

  const handleAdd = async () => {
    if (!selectedEmployeeId) return;

    try {
      setIsSubmitting(true);

      await onAdd?.(task.id, Number(selectedEmployeeId));

      setSelectedEmployeeId("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (employeeId) => {
    try {
      setIsSubmitting(true);

      await onRemove?.(task.id, employeeId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>
            Tildelte medarbejdere ({assignedEmployees.length})
          </h3>

          <p className={styles.description}>
            {competenceName
              ? `Vælg hvilke medarbejdere med kompetencen ${competenceName} der skal udføre opgaven.`
              : "Vælg hvilke medarbejdere der skal udføre opgaven."}
          </p>
        </div>
      </div>

      {assignedEmployees.length === 0 ? (
        <p className={styles.emptyText}>
          Ingen medarbejdere er tildelt denne opgave endnu.
        </p>
      ) : (
        <div className={styles.userList}>
          {assignedEmployees.map((employee) => (
            <div
              key={employee.id}
              className={styles.userItem}
              onClick={() => navigate(`/employees/${employee.id}`)}
            >
              <Avatar
                firstName={employee.firstName}
                lastName={employee.lastName}
                size="md"
              />

              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {employee.firstName} {employee.lastName}
                </span>

                <span className={styles.userRole}>
                  {[
                    competenceName,
                    employee.dailyCapacity != null &&
                      `${employee.dailyCapacity.toLocaleString("da-DK")} t/dag`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>

              <div className={styles.userActions}>
                {!employee.active && <Badge status="DISABLED" label="Inaktiv" />}

                {!isLocked && (
                  <Button
                    type="button"
                    variant="ghostDanger"
                    iconOnly
                    title="Fjern medarbejder"
                    icon={<FiTrash2 size={16} />}
                    disabled={isSubmitting}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(employee.id);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isLocked ? (
        <p className={styles.emptyText}>
          Tildelinger kan ikke ændres på en færdig opgave.
        </p>
      ) : (
        <div className={styles.addSection}>
          <Select
            label="Tilføj medarbejder"
            name="employeeId"
            value={selectedEmployeeId}
            options={employeeOptions}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
          />

          <Button
            type="button"
            variant="secondary"
            name={isSubmitting ? "Tilføjer..." : "Tilføj"}
            disabled={!selectedEmployeeId || isSubmitting}
            onClick={handleAdd}
          />
        </div>
      )}
    </div>
  );
};

export default TaskAssignments;

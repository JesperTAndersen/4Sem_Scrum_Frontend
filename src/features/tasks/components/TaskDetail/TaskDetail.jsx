import { useState } from "react";
import styles from "./TaskDetail.module.css";
import TaskDependencies from "../TaskDependencies/TaskDependencies";
import Button from "@/shared/components/ui/Button/Button";
import Badge from "@/shared/components/ui/Badge/Badge";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";
import TaskEditForm from "../TaskEditForm/TaskEditForm";
import TaskAssignments from "../TaskAssignments/TaskAssignments";
import { formatCurrency } from "@/utils/formatters";
import { formatShortDate } from "@/utils/dateHelpers";
import formatDays from "../../utils/formatDays";
import getStaffingWarnings from "../../utils/getStaffingWarnings";
import { FiX } from "react-icons/fi";

const TaskDetail = ({
  task,
  tasks = [],
  blockedBy = [],
  competences = [],
  employees = [],
  onTaskDelete,
  onTaskEdit,
  onTaskStatusChange,
  onTaskDependencyAdd,
  onTaskDependencyRemove,
  onEmployeeAssigned,
  onEmployeeUnassigned,
  onClose,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const isBlocked = blockedBy.length > 0;

  const handleUpdate = async (updatedTask) => {
    await onTaskEdit(updatedTask);
    setShowEditForm(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          {showEditForm ? (
            <TaskEditForm
              task={task}
              competences={competences}
              onSubmit={handleUpdate}
              onCancel={() => setShowEditForm(false)}
            />
          ) : (
            <>
              <div className={styles.header}>
                <div className={styles.titleWrapper}>
                  <div className={styles.titleRow}>
                    <h1 className={styles.title}>{task.name}</h1>
                    <Badge status={task.status} />
                    <Badge status={task.staffingStatus} />
                  </div>

                  {isBlocked && task.status !== "DONE" && (
                    <p className={styles.blockedText}>
                      Venter på: {blockedBy.join(", ")}
                    </p>
                  )}
                </div>

                <div className={styles.headerActions}>
                  {task.status === "NOT_STARTED" && (
                    <Button
                      variant="primary"
                      name="Sæt i gang"
                      disabled={isBlocked}
                      onClick={() => onTaskStatusChange(task, "IN_PROGRESS")}
                    />
                  )}

                  {task.status === "IN_PROGRESS" && (
                    <>
                      <Button
                        variant="secondary"
                        name="Tilbage til ikke startet"
                        onClick={() => onTaskStatusChange(task, "NOT_STARTED")}
                      />

                      <Button
                        variant="primary"
                        name="Markér som færdig"
                        disabled={isBlocked}
                        onClick={() => onTaskStatusChange(task, "DONE")}
                      />
                    </>
                  )}

                  {task.status === "DONE" && (
                    <Button
                      variant="secondary"
                      name="Genåbn opgave"
                      onClick={() => onTaskStatusChange(task, "IN_PROGRESS")}
                    />
                  )}

                  {onClose && (
                    <Button
                      variant="ghost"
                      iconOnly
                      title="Luk"
                      icon={<FiX size={18} />}
                      onClick={onClose}
                    />
                  )}
                </div>
              </div>

              <div className={styles.group}>
                <div className={styles.metaGrid}>
                  <div className={`${styles.field} ${styles.fullWidth}`}>
                    <span className={styles.label}>Periode</span>
                    <span className={styles.value}>
                      {task.startDate && task.endDate
                        ? `${formatShortDate(task.startDate)} – ${formatShortDate(task.endDate)}`
                        : "Kan ikke beregnes"}
                    </span>
                    {task.status === "DONE" && (
                      <span className={styles.hint}>
                        Planlagte værdier fra da opgaven blev afsluttet, ikke
                        faktisk tidsforbrug.
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Kompetence</span>
                    <span className={styles.value}>
                      {task.competence?.name || "Ingen kompetence"}
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Estimat</span>
                    <span className={styles.value}>
                      {task.estimate ?? 0} timer
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Varighed</span>
                    <span className={styles.value}>
                      {task.scheduledDurationInDays != null
                        ? `${formatDays(task.scheduledDurationInDays)} (min. ${task.minimumDurationInDays ?? 0})`
                        : "Kan ikke beregnes"}
                    </span>
                    {task.laborDurationInDays != null && (
                      <span className={styles.hint}>
                        Arbejdstid: {formatDays(task.laborDurationInDays)}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Pris</span>
                    <span className={styles.value}>
                      {formatCurrency(task.cost ?? 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.group}>
                <TaskDependencies
                  task={task}
                  tasks={tasks}
                  onAdd={onTaskDependencyAdd}
                  onRemove={onTaskDependencyRemove}
                />
              </div>

              <div className={styles.group}>
                <TaskAssignments
                  task={task}
                  employees={employees}
                  onAdd={onEmployeeAssigned}
                  onRemove={onEmployeeUnassigned}
                />

                {task.staffingStatus === "STAFFING_REQUIRED" && (
                  <p className={styles.hint}>
                    Ingen medarbejdere tildelt – varigheden er beregnet med én
                    person á 7,5 timer om dagen.
                  </p>
                )}

                {getStaffingWarnings(task).map((text) => (
                  <p key={text} className={styles.warningText}>
                    {text}
                  </p>
                ))}

                {task.staffingStatus === "NO_AVAILABLE_CAPACITY" && (
                  <p className={styles.hint}>
                    Varigheden kan ikke beregnes, før en aktiv medarbejder med
                    kompetencen er tildelt.
                  </p>
                )}
              </div>

              <div className={styles.actionsGroup}>
                <Button
                  variant="danger"
                  name="Slet opgave"
                  onClick={() => setShowConfirm(true)}
                />

                <Button
                  variant="secondary"
                  name="Rediger opgave"
                  onClick={() => setShowEditForm(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message={`Slet "${task.name}"?`}
          onConfirm={() => {
            onTaskDelete(task);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default TaskDetail;

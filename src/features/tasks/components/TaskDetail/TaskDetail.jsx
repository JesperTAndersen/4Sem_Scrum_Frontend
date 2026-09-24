import { useState } from "react";

import styles from "./TaskDetail.module.css";

import BackButton from "@/shared/components/ui/BackButton/BackButton";
import Button from "@/shared/components/ui/Button/Button";
import Card from "@/shared/components/ui/Card/Card";
import Badge from "@/shared/components/ui/Badge/Badge";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";

import TaskEditForm from "../TaskEditForm/TaskEditForm";
import { formatDate } from "@/utils/dateHelpers";

const TaskDetail = ({
  task,
  competences = [],
  onTaskDelete,
  onTaskEdit,
  onTaskStatusChange,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleUpdate = async (updatedTask) => {
    await onTaskEdit(updatedTask);
    setShowEditForm(false);
  };

  const competence = competences.find(
    (competence) => competence.id === task.competenceId,
  );

  return (
    <>
      <div className={styles.container}>
        <BackButton />

        <Card variant="card">
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
                  </div>

                  <p className={styles.description}>
                    {task.estimate} estimerede arbejdstimer
                  </p>
                </div>
              </div>

              <div className={styles.group}>
                <div className={styles.metaGrid}>
                  <div className={styles.field}>
                    <span className={styles.label}>Kompetence</span>
                    <span className={styles.value}>
                      {competence?.name || "Ingen kompetence"}
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Estimeret arbejdstid</span>
                    <span className={styles.value}>
                      {task.estimate ?? 0} timer
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Minimum varighed</span>
                    <span className={styles.value}>
                      {task.minimumDurationInDays ?? 0} arbejdsdage
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Arbejdsvarighed</span>
                    <span className={styles.value}>
                      {task.laborDurationInDays != null
                        ? `${task.laborDurationInDays.toFixed(2)} arbejdsdage`
                        : "-"}
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Planlagt varighed</span>
                    <span className={styles.value}>
                      {task.scheduledDurationInDays != null
                        ? `${task.scheduledDurationInDays.toFixed(2)} arbejdsdage`
                        : "-"}
                    </span>
                  </div>

                  {task.createdAt && (
                    <div className={styles.field}>
                      <span className={styles.label}>Oprettet</span>
                      <span className={styles.value}>
                        {formatDate(task.createdAt)}
                      </span>
                    </div>
                  )}

                  {task.updatedAt && (
                    <div className={styles.field}>
                      <span className={styles.label}>Senest opdateret</span>
                      <span className={styles.value}>
                        {formatDate(task.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.actionsGroup}>
                <Button
                  variant="danger"
                  name="Slet opgave"
                  onClick={() => setShowConfirm(true)}
                />

                {task.status === "NOT_STARTED" && (
                  <Button
                    variant="primary"
                    name="Sæt i gang"
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

                <Button
                  variant="secondary"
                  name="Rediger opgave"
                  onClick={() => setShowEditForm(true)}
                />
              </div>
            </>
          )}
        </Card>
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

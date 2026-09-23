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
  competences,
  onTaskDelete,
  onTaskEdit,
  onTaskStatusChange,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleUpdate = (updatedTask) => {
    onTaskEdit(updatedTask);
    setShowEditForm(false);
  };

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
                    {task.estimate} estimerede timer på opgaven
                  </p>
                </div>
              </div>

              <div className={styles.group}>
                <div className={styles.metaGrid}>
                  <div className={styles.field}>
                    <span className={styles.label}>Oprettet</span>
                    <span className={styles.value}>
                      {formatDate(task?.createdAt)}
                    </span>
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Senest opdateret</span>
                    <span className={styles.value}>
                      {task?.updatedAt ? formatDate(task.updatedAt) : "Aldrig"}
                    </span>
                  </div>
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
                    name="Sæt i gang"
                    onClick={() => onTaskStatusChange("IN_PROGRESS")}
                  />
                )}

                {task.status === "IN_PROGRESS" && (
                  <>
                    <Button
                      name="Tilbage til ikke startet"
                      onClick={() => onTaskStatusChange("NOT_STARTED")}
                    />

                    <Button
                      name="Markér som færdig"
                      onClick={() => onTaskStatusChange("DONE")}
                    />
                  </>
                )}

                {task.status === "DONE" && (
                  <Button
                    name="Genåbn opgave"
                    onClick={() => handleStatusChange("IN_PROGRESS")}
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

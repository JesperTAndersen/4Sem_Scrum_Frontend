import styles from "./StagesList.module.css";
import Button from "@/shared/components/ui/Button/Button";
import StageItem from "../StageItem/StageItem";
import stageService from "../../services/stageService";
import Modal from "@/shared/components/ui/Modal/Modal";
import StageCreateForm from "../StageCreateForm/StageCreateForm";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import Card from "@/shared/components/ui/Card/Card";
import StageEditForm from "../StageEditForm/StageEditForm";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";
import taskService from "@/features/tasks/services/taskService";
import TaskCreateForm from "@/features/tasks/components/TaskCreateForm/TaskCreateForm";
import TaskDetail from "@/features/tasks/components/TaskDetail/TaskDetail";

const StagesList = ({
  projectId,
  stages = [],
  competences = [],
  onStageCreated,
  onStageEdited,
  onStageDeleted,
  onTaskCreated,
  onTaskEdited,
  onTaskDeleted,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [deletingStage, setDeletingStage] = useState(null);
  const [taskCreateStageId, setTaskCreateStageId] = useState(null);
  const [task, setTask] = useState(null);

  const { notify } = useNotification();

  const handleCreateStage = async (formData) => {
    try {
      const newStage = await stageService.create(formData);
      onStageCreated(newStage);
      setShowCreateForm(false);
    } catch (error) {
      notify("error", error.message || "Kunne ikke oprette etapen.");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const updated = await stageService.update(editingStage.id, formData);
      onStageEdited(updated);
      notify("success", "Etape opdateret.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere etapen.");
      throw error;
    } finally {
      setEditingStage(null);
    }
  };

  const handleDelete = async (stageId) => {
    try {
      await stageService.remove(stageId);
      onStageDeleted(stageId);
      notify("success", "Etape slettet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke slette etapen.");
    } finally {
      setDeletingStage(null);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      const newTask = await taskService.create(formData);

      onTaskCreated(taskCreateStageId, newTask);

      notify("success", "Opgave oprettet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke oprette opgaven.");
    } finally {
      setTaskCreateStageId(null);
    }
  };

  const handleOnTaskView = async (task) => {
    setTask(task);
  };

  const handleDeleteTask = async () => {
    try {
      await taskService.remove(task.id);
      onTaskDeleted(task.id);
      notify("success", "Opgave slettet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke slette opgave.");
    } finally {
      setTask(null);
    }
  };

  const handleEditTask = async (formData) => {
    try {
      const updated = await taskService.update(task.id, formData);
      onTaskEdited(updated);
      notify("success", "Opgave opdateret.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere opgaven.");
      throw error;
    } finally {
      setTask(null);
    }
  };

  const handleChangeStatusTask = async (currentTask, status) => {
    try {
      const payload = {
        name: currentTask.name,
        minimumDurationInDays: currentTask.minimumDurationInDays,
        competenceId: currentTask.competenceId,
        estimate: currentTask.estimate,
        status,
      };

      const updated = await taskService.update(currentTask.id, payload);

      onTaskEdited(updated);
      setTask(updated);

      notify("success", "Opgavens status blev opdateret.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere opgaven.");
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Etaper ({stages.length})</h3>

        <Button
          icon={<FiPlusCircle />}
          name="Opret Etape"
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        />
      </div>

      <div className={styles.list}>
        {stages.map((stage) => (
          <StageItem
            key={stage.id}
            stage={stage}
            onEdit={(stage) => setEditingStage(stage)}
            onDelete={setDeletingStage}
            onTaskCreate={setTaskCreateStageId}
            onView={handleOnTaskView}
          />
        ))}
        {stages.length === 0 && (
          <p className={styles.empty}>
            Der er endnu ikke oprettet nogen etaper.
          </p>
        )}

        {editingStage && (
          <Modal onClose={() => setEditingStage(null)}>
            <Card>
              <StageEditForm
                stage={editingStage}
                onSubmit={handleUpdate}
                handleUpdate={handleUpdate}
                onCancel={() => setEditingStage(null)}
              />
            </Card>
          </Modal>
        )}
      </div>
      {showCreateForm && (
        <Modal onClose={() => setShowCreateForm(false)}>
          <Card>
            <StageCreateForm
              projectId={projectId}
              onSubmit={handleCreateStage}
              onCancel={() => setShowCreateForm(false)}
            />
          </Card>
        </Modal>
      )}

      {taskCreateStageId && (
        <Modal onClose={() => setTaskCreateStageId(null)}>
          <Card>
            <TaskCreateForm
              stageId={taskCreateStageId}
              onSubmit={handleCreateTask}
              onCancel={() => setTaskCreateStageId(null)}
              competences={competences}
            />
          </Card>
        </Modal>
      )}

      {deletingStage && (
        <ConfirmDialog
          message={`Slet "${deletingStage.name || deletingStage.title}"?`}
          onConfirm={() => handleDelete(deletingStage.id)}
          onCancel={() => setDeletingStage(null)}
        />
      )}

      {task && (
        <Modal onClose={() => setTask(null)}>
          <Card>
            <TaskDetail
              task={task}
              onTaskDelete={handleDeleteTask}
              onTaskStatusChange={handleChangeStatusTask}
              onTaskEdit={handleEditTask}
              competences={competences}
            />
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default StagesList;

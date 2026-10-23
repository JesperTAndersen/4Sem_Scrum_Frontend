import styles from "./StagesList.module.css";
import Button from "@/shared/components/ui/Button/Button";
import StageItem from "../StageItem/StageItem";
import stageService from "../../services/stageService";
import Modal from "@/shared/components/ui/Modal/Modal";
import StageCreateForm from "../StageCreateForm/StageCreateForm";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import Card from "@/shared/components/ui/Card/Card";
import StageEditForm from "../StageEditForm/StageEditForm";
import StageDependencies from "../StageDependencies/StageDependencies";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";
import taskService from "@/features/tasks/services/taskService";
import TaskCreateForm from "@/features/tasks/components/TaskCreateForm/TaskCreateForm";
import SectionHeader from "@/shared/components/layout/SectionHeader/SectionHeader";

const StagesList = ({
  projectId,
  stages = [],
  competences = [],
  onStageCreated,
  onStageEdited,
  onStageDeleted,
  onTaskCreated,
  onTaskView,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStageId, setEditingStageId] = useState(null);
  const [deletingStage, setDeletingStage] = useState(null);
  const [taskCreateStageId, setTaskCreateStageId] = useState(null);

  const { notify } = useNotification();

  const allTasks = stages.flatMap((stage) => stage.tasks ?? []);
  const editingStage = stages.find((stage) => stage.id === editingStageId);

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
      setEditingStageId(null);
    }
  };

  const handleStageDependencyAdd = async (stageId, predecessorId) => {
    try {
      await stageService.addPredecessor(stageId, predecessorId);
      await onStageEdited();
      notify("success", "Afhængighed tilføjet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke tilføje afhængigheden.");
    }
  };

  const handleStageDependencyRemove = async (stageId, predecessorId) => {
    try {
      await stageService.removePredecessor(stageId, predecessorId);
      await onStageEdited();
      notify("success", "Afhængighed fjernet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke fjerne afhængigheden.");
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

  return (
    <div className={styles.container}>
      <SectionHeader
        title={`Etaper (${stages.length})`}
        description="Projektets etaper og opgaver. Klik på en opgave for at se detaljer."
      >
        <Button
          icon={<FiPlusCircle />}
          name="Opret Etape"
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        />
      </SectionHeader>

      <div className={styles.list}>
        {stages.map((stage) => (
          <StageItem
            key={stage.id}
            stage={stage}
            allTasks={allTasks}
            stages={stages}
            onEdit={(stage) => setEditingStageId(stage.id)}
            onDelete={setDeletingStage}
            onTaskCreate={setTaskCreateStageId}
            onView={onTaskView}
          />
        ))}
        {stages.length === 0 && (
          <p className={styles.empty}>
            Der er endnu ikke oprettet nogen etaper.
          </p>
        )}

        {editingStage && (
          <Modal onClose={() => setEditingStageId(null)}>
            <Card>
              <StageEditForm
                stage={editingStage}
                onSubmit={handleUpdate}
                onCancel={() => setEditingStageId(null)}
              />
            </Card>

            <Card>
              <StageDependencies
                stage={editingStage}
                stages={stages}
                onAdd={handleStageDependencyAdd}
                onRemove={handleStageDependencyRemove}
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
    </div>
  );
};

export default StagesList;

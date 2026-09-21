import styles from "./StagesList.module.css";
import Button from "@/shared/components/ui/Button/Button";
import StageItem from "../StageItem/StageItem";
import stageService from "../../services/stageService";
import Modal from "@/shared/components/ui/Modal/Modal";
import StageCreateForm from "../StageCreateForm/StageCreateForm";
import StageDetail from "../StageDetail/StageDetail";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import Card from "@/shared/components/ui/Card/Card";
import StageEditForm from "../StageEditForm/StageEditForm";

const StagesList = ({
  projectId,
  stages = [],
  onStageCreated,
  onStageEdited,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [deletingStageId, setDeletingStageId] = useState(null);
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
          <>
            <StageItem
              key={stage.id}
              stage={stage}
              onEdit={(stage) => setEditingStage(stage)}
              onDelete={(stageId) => setDeletingStageId(stageId)}
            />

            {editingStage && (
              <Modal onClose={() => setEditingStage(null)}>
                <Card>
                  <StageEditForm
                    stage={stage}
                    onSubmit={handleUpdate}
                    handleUpdate={handleUpdate}
                    onCancel={() => setEditingStage(null)}
                  />
                </Card>
              </Modal>
            )}
          </>
        ))}
        {stages.length === 0 && (
          <p className={styles.empty}>
            Der er endnu ikke oprettet nogen etaper.
          </p>
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
    </div>
  );
};

export default StagesList;

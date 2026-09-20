import styles from "./StagesList.module.css";
import Button from "@/shared/components/ui/Button/Button";
import StageItem from "../StageItem/StageItem";
import stageService from "../../services/stageService";
import Modal from "@/shared/components/ui/Modal/Modal";
import StageCreateForm from "../StageCreateForm/StageCreateForm";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import Card from "@/shared/components/ui/Card/Card";

const StagesList = ({ projectId, stages = [], onStageCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { notify } = useNotification();

  const handleCreateStage = async (formData) => {
    try {
      const newStage = await stageService.create(formData);
      onStageCreated(newStage);
      setShowCreateForm(false);
    } catch (error) {
      notify("error", error.message || "Kunne ikke oprette etappen.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Etaper ({stages.length})</h3>

        <Button
          icon={<FiPlus />}
          name="Opret Etape"
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        />
      </div>

      <div className={styles.list}>
        {stages.map((stage) => (
          <StageItem key={stage.id} stage={stage} />
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

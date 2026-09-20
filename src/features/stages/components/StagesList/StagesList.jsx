import styles from "./StagesList.module.css";
import Button from "@/shared/components/ui/Button/Button";
import StageItem from "../StageItem/StageItem";
import { FiPlus } from "react-icons/fi";

const StagesList = ({ projectId, stages = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Etaper ({stages.length})</h3>

        <Button icon={<FiPlus />} name="Opret Etape" variant="primary" />
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
    </div>
  );
};

export default StagesList;

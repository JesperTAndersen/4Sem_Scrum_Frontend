import styles from "./StageItem.module.css";
import Badge from "@/shared/components/ui/Badge/Badge";
import Button from "@/shared/components/ui/Button/Button";
import Card from "@/shared/components/ui/Card/Card";
import {
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useState } from "react";

const StageItem = ({ stage, onEdit, onDelete, onTaskCreate, onView }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(stage)

  return (
    <Card variant="flat">
      <div className={styles.stageHeader} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.titleInfo}>
          <h4>{stage.title || stage.name}</h4>
          <span className={styles.hours}>
            (Total estimeret timer i denne etape: {stage.totalEstimatedHours || 0} timer)
          </span>
        </div>

        <div className={styles.headerActions}>
          <Button
            icon={<FiEdit2 size={16} />}
            variant="ghost"
            iconOnly={true}
            title="Rediger etape"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(stage);
            }}
          />

          <Button
            icon={<FiTrash2 size={16} />}
            variant="ghostDanger"
            iconOnly={true}
            title="Slet etape"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(stage);
            }}
          />

          <span className={styles.chevronToggle}>
            {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.stageContent}>
          <div className={styles.contentActions}>
            <Button
              icon={<FiPlusCircle />}
              name="Ny Opgave"
              variant="secondary"
              onClick={() => onTaskCreate?.(stage.id)}
            />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Opgave</th>
                  <th>Kompetence</th>
                  <th>Estimeret tid</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stage.tasks?.map((task) => (
                  <tr key={task.id} className={styles.row} onClick={onView(task)}>
                    <td>{task.name}</td>
                    <td>
                      {task.competences?.length
                        ? task.competences.map((c) => c.name).join(", ")
                        : "-"}
                    </td>
                    <td>{task.estimate || 0} timer</td>
                    <td>
                      <Badge status={task.status || "NOT_STARTED"} />
                    </td>
                    <td>
                      <FiChevronRight className={styles.chevron} />
                    </td>
                  </tr>
                ))}

                {(!stage.tasks || stage.tasks.length === 0) && (
                  <tr>
                    <td colSpan="4" className={styles.emptyTask}>
                      Ingen opgaver i denne etape endnu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StageItem;

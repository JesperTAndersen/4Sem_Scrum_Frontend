import styles from "./StageItem.module.css";
import { formatDate } from "@/utils/dateHelpers";
import Button from "@/shared/components/ui/Button/Button";
import Card from "@/shared/components/ui/Card/Card";
import TaskCard from "@/features/tasks/components/TaskCard/TaskCard";
import { formatCurrency } from "@/utils/formatters";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import { useState } from "react";

const StageItem = ({
  stage,
  allTasks = [],
  onEdit,
  onDelete,
  onTaskCreate,
  onView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card variant="flat">
      <div
        className={styles.stageHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.titleInfo}>
          <h4 className={styles.title}>{stage.title || stage.name}</h4>

          <div className={styles.meta}>
            <span>
              {formatDate(stage?.startDate)} – {formatDate(stage?.endDate)}
            </span>
            <span>{stage.totalEstimatedHours ?? 0} timer</span>
            <span>{formatCurrency(stage?.totalCost ?? 0)}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <Button
            icon={<FiEdit2 size={16} />}
            variant="ghost"
            iconOnly
            title="Rediger etape"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(stage);
            }}
          />

          <Button
            icon={<FiTrash2 size={16} />}
            variant="ghostDanger"
            iconOnly
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
          <div className={styles.contentHeader}>
            <div className={styles.taskSummary}>
              <span>
                {stage.tasks?.length ?? 0}{" "}
                {stage.tasks?.length === 1 ? "opgave" : "opgaver"}
              </span>
            </div>

            <Button
              icon={<FiPlusCircle />}
              name="Ny opgave"
              variant="secondary"
              onClick={() => onTaskCreate?.(stage.id)}
            />
          </div>

          {stage.tasks?.length > 0 ? (
            <div className={styles.taskGrid}>
              {stage.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={onView}
                  tasks={allTasks}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyTask}>
              Ingen opgaver i denne etape endnu.
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default StageItem;

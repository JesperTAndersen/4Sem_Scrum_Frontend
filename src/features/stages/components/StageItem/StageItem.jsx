import styles from "./StageItem.module.css";
import { formatDate } from "@/utils/dateHelpers";
import Button from "@/shared/components/ui/Button/Button";
import Card from "@/shared/components/ui/Card/Card";
import TaskCard from "@/features/tasks/components/TaskCard/TaskCard";
import Badge from "@/shared/components/ui/Badge/Badge";
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
  stages = [],
  onEdit,
  onDelete,
  onTaskCreate,
  onView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const predecessorNames = stages
    .filter((s) => stage.predecessorIds?.includes(s.id))
    .map((s) => s.name);

  const sortedTasks = [...(stage.tasks ?? [])].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate),
  );

  return (
    <Card variant="flat">
      <div
        className={styles.stageHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.titleInfo}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>{stage.title || stage.name}</h4>
            {stage.completed && <Badge status="DONE" />}
          </div>

          <div className={styles.meta}>
            <span>
              {formatDate(stage?.startDate)} – {formatDate(stage?.endDate)}
            </span>
            <span>{stage.totalEstimatedHours ?? 0} timer</span>
            <span>{formatCurrency(stage?.totalCost ?? 0)}</span>
          </div>

          {predecessorNames.length > 0 && (
            <span className={styles.dependsOn}>
              Afhænger af: {predecessorNames.join(", ")}
            </span>
          )}
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
              {sortedTasks.map((task) => (
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

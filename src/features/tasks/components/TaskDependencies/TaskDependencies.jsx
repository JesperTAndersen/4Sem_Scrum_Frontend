import { useMemo, useState } from "react";

import styles from "./TaskDependencies.module.css";

import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";

import Badge from "@/shared/components/ui/Badge/Badge";
import { FiArrowDown, FiArrowRight, FiTrash2 } from "react-icons/fi";

const TaskDependencies = ({ task, tasks = [], onAdd, onRemove }) => {
  const [selectedPredecessorId, setSelectedPredecessorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predecessorTasks = useMemo(() => {
    return tasks.filter((candidate) =>
      task.predecessorIds?.includes(candidate.id),
    );
  }, [tasks, task.predecessorIds]);

  const allPredecessorsDone = predecessorTasks.every(
    (predecessor) => predecessor.status === "DONE",
  );

  const availablePredecessors = useMemo(() => {
    return tasks.filter(
      (candidate) =>
        candidate.id !== task.id &&
        !task.predecessorIds?.includes(candidate.id),
    );
  }, [tasks, task.id, task.predecessorIds]);

  const predecessorOptions = availablePredecessors.map((candidate) => ({
    value: candidate.id,
    label: candidate.name,
  }));

  const handleAdd = async () => {
    if (!selectedPredecessorId) return;

    try {
      setIsSubmitting(true);

      await onAdd?.(task.id, Number(selectedPredecessorId));

      setSelectedPredecessorId("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (predecessorId) => {
    try {
      setIsSubmitting(true);

      await onRemove?.(task.id, predecessorId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Afhængigheder</h3>

          <p className={styles.description}>
            Vælg hvilke opgaver i samme etape der skal være færdige, før denne
            opgave kan starte.
          </p>
        </div>
      </div>

      {predecessorTasks.length > 0 ? (
        <div className={styles.flow}>
          <div className={styles.predecessors}>
            {predecessorTasks.map((predecessor) => (
              <div key={predecessor.id} className={styles.taskCard}>
                <div className={styles.taskInfo}>
                  <span className={styles.taskName}>{predecessor.name}</span>

                  <span className={styles.taskMeta}>
                    {predecessor.estimate ?? 0} timer
                  </span>
                </div>

                <div className={styles.taskActions}>
                  <Badge status={predecessor.status} />

                  <Button
                    type="button"
                    variant="ghostDanger"
                    iconOnly
                    title="Fjern afhængighed"
                    icon={<FiTrash2 size={16} />}
                    disabled={isSubmitting}
                    onClick={() => handleRemove(predecessor.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={`${styles.arrow} ${allPredecessorsDone ? styles.arrowReady : ""}`}
          >
            <FiArrowRight className={styles.arrowRight} size={22} />
            <FiArrowDown className={styles.arrowDown} size={22} />
          </div>

          <div className={styles.currentTask}>
            <span className={styles.taskName}>{task.name}</span>
            <span className={styles.taskMeta}>Denne opgave</span>
          </div>
        </div>
      ) : (
        <p className={styles.emptyText}>
          Denne opgave har ingen afhængigheder.
        </p>
      )}

      <div className={styles.addSection}>
        <Select
          label="Tilføj forgænger"
          name="predecessorId"
          value={selectedPredecessorId}
          options={predecessorOptions}
          onChange={(e) => setSelectedPredecessorId(e.target.value)}
        />

        <Button
          type="button"
          variant="secondary"
          name={isSubmitting ? "Tilføjer..." : "Tilføj"}
          disabled={!selectedPredecessorId || isSubmitting}
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default TaskDependencies;

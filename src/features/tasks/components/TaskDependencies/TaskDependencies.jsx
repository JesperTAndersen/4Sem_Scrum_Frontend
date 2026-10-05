import { useMemo, useState } from "react";

import styles from "./TaskDependencies.module.css";

import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";

import { FiTrash2 } from "react-icons/fi";

const TaskDependencies = ({ task, tasks = [], onAdd, onRemove }) => {
  const [selectedPredecessorId, setSelectedPredecessorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predecessorTasks = useMemo(() => {
    return tasks.filter((candidate) =>
      task.predecessorIds?.includes(candidate.id),
    );
  }, [tasks, task.predecessorIds]);

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
            Vælg hvilke opgaver der skal være færdige, før denne opgave kan
            starte.
          </p>
        </div>
      </div>

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

      <div className={styles.list}>
        {predecessorTasks.length > 0 ? (
          predecessorTasks.map((predecessor) => (
            <div key={predecessor.id} className={styles.item}>
              <div className={styles.itemContent}>
                <span className={styles.itemName}>{predecessor.name}</span>

                <span className={styles.itemMeta}>
                  {predecessor.estimate ?? 0} timer
                </span>
              </div>

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
          ))
        ) : (
          <p className={styles.empty}>Denne opgave har ingen afhængigheder.</p>
        )}
      </div>
    </div>
  );
};

export default TaskDependencies;

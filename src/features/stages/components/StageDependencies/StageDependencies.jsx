import { useState } from "react";
import styles from "./StageDependencies.module.css";
import Button from "@/shared/components/ui/Button/Button";
import Badge from "@/shared/components/ui/Badge/Badge";
import Select from "@/shared/components/filter/Select/Select";
import { FiTrash2 } from "react-icons/fi";

const StageDependencies = ({ stage, stages = [], onAdd, onRemove }) => {
  const [selectedPredecessorId, setSelectedPredecessorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const predecessorIds = stage.predecessorIds ?? [];

  const predecessorStages = stages.filter((candidate) =>
    predecessorIds.includes(candidate.id),
  );

  const predecessorOptions = stages
    .filter(
      (candidate) =>
        candidate.id !== stage.id && !predecessorIds.includes(candidate.id),
    )
    .map((candidate) => ({
      value: candidate.id,
      label: candidate.name,
    }));

  const handleAdd = async () => {
    if (!selectedPredecessorId) return;

    try {
      setIsSubmitting(true);

      await onAdd?.(stage.id, Number(selectedPredecessorId));

      setSelectedPredecessorId("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (predecessorId) => {
    try {
      setIsSubmitting(true);

      await onRemove?.(stage.id, predecessorId);
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
            Vælg hvilke etaper der skal være færdige, før opgaverne i denne
            etape kan starte.
          </p>
        </div>
      </div>

      <div className={styles.addSection}>
        <Select
          label="Tilføj forgænger-etape"
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
        {predecessorStages.length > 0 ? (
          predecessorStages.map((predecessor) => (
            <div key={predecessor.id} className={styles.item}>
              <div className={styles.itemContent}>
                <span className={styles.itemName}>{predecessor.name}</span>

                <span className={styles.itemMeta}>
                  {predecessor.tasks?.length ?? 0} opgaver
                </span>
              </div>

              <div className={styles.itemActions}>
                <Badge
                  status={predecessor.completed ? "DONE" : "NOT_STARTED"}
                  label={predecessor.completed ? "Færdig" : "Ikke færdig"}
                />

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
          ))
        ) : (
          <p className={styles.empty}>Denne etape har ingen afhængigheder.</p>
        )}
      </div>
    </div>
  );
};

export default StageDependencies;

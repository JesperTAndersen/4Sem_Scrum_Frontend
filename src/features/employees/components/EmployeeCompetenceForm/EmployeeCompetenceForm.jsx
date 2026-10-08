import styles from "./EmployeeCompetenceForm.module.css";
import { useState } from "react";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import Button from "@/shared/components/ui/Button/Button";
import CompetenceSelector from "@/features/competences/components/CompetenceSelector/CompetenceSelector";

const EmployeeCompetenceForm = ({
  employee,
  competences = [],
  onSubmit,
  onCancel,
}) => {
  const [selectedIds, setSelectedIds] = useState(
    employee.competences?.map((c) => c.id) ?? [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectableCompetences = competences.filter(
    (c) => c.active || selectedIds.includes(c.id),
  );

  const handleToggleCompetence = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((competenceId) => competenceId !== id)
        : [...prev, id],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await onSubmit(selectedIds);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormHeader
        title="Rediger kompetencer"
        subtitle={`Vælg hvilke fag ${employee.firstName} kan udføre`}
      />

      <CompetenceSelector
        competences={selectableCompetences}
        selectedIds={selectedIds}
        onToggle={handleToggleCompetence}
      />

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          name="Fortryd"
          onClick={onCancel}
        />
        <Button
          type="submit"
          variant="primary"
          name={isSubmitting ? "Gemmer..." : "Gem kompetencer"}
          disabled={isSubmitting}
        />
      </div>
    </FormLayout>
  );
};

export default EmployeeCompetenceForm;

import styles from "./TaskEditForm.module.css";
import { useState } from "react";

import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";

import { validateTask } from "../../utils/validateTask";

const TaskEditForm = ({
  task,
  onSubmit,
  onCancel,
  competences = [],
}) => {
  const [formData, setFormData] = useState({
    name: task.name ?? "",
    estimate: task.estimate ?? "",
    minimumDurationInDays: task.minimumDurationInDays ?? "",
    competenceId: task.competence?.id ?? "",
  });

  const [errors, setErrors] = useState({
    name: "",
    estimate: "",
    minimumDurationInDays: "",
    competenceId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const competenceOptions = competences.map((competence) => ({
    value: competence.id,
    label: competence.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } =
      validateTask(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        competenceId: Number(formData.competenceId),
        estimate: Number(formData.estimate),
        minimumDurationInDays: Number(
          formData.minimumDurationInDays,
        ),
      };

      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormHeader
        title="Rediger opgave"
        subtitle="Opdater navn, kompetence eller tidsestimering"
      />

      <Input
        label="Opgave navn"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Fx. Afslibning af sildebensparket"
        hasError={!!errors.name}
        errorMessage={errors.name}
        required
      />

      <Select
        label="Vælg en kompetence til opgaven"
        name="competenceId"
        options={competenceOptions}
        value={formData.competenceId}
        onChange={handleChange}
        hasError={!!errors.competenceId}
        errorMessage={errors.competenceId}
        required
      />

      <Input
        label="Tidsestimering"
        type="number"
        name="estimate"
        value={formData.estimate}
        onChange={handleChange}
        placeholder="8"
        min="0"
        step="0.5"
        hasError={!!errors.estimate}
        errorMessage={errors.estimate}
        required
      />

      <Input
        label="Minimum varighed i arbejdsdage"
        type="number"
        name="minimumDurationInDays"
        value={formData.minimumDurationInDays}
        onChange={handleChange}
        placeholder="2"
        min="0"
        step="1"
        hasError={!!errors.minimumDurationInDays}
        errorMessage={errors.minimumDurationInDays}
        required
      />

      <div className={styles.actions}>
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          name="Fortryd"
        />

        <Button
          type="submit"
          variant="primary"
          name={isSubmitting ? "Opdaterer..." : "Opdater opgave"}
          disabled={isSubmitting}
        />
      </div>
    </FormLayout>
  );
};

export default TaskEditForm;
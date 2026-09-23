import styles from "./TaskEditForm.module.css";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateTask } from "../../utils/validateTask";
import { useState } from "react";

const TaskEditForm = ({ task, onSubmit, onCancel, competences = [] }) => {
  const [formData, setFormData] = useState({
    name: task.name ?? "",
    estimate: task.estimate ?? "",
    minimumDurationInDays: task.minimumDurationInDays ?? "",
    competenceId: task.competenceId ?? "",
  });
  const [errors, setErrors] = useState({
    name: "",
    estimate: "",
    minimumDurationInDays: "",
    competenceId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const competenceOptions = competences.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } = validateTask(formData);

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
        minimumDurationInDays: Number(formData.minimumDurationInDays),
      };

      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit}>
        <FormHeader
          title="Rediger opgave"
          subtitle="Opdater navn, kompetence eller tids estimering"
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
          label="Tids estimering"
          type="number"
          name="estimate"
          value={formData.estimate}
          onChange={handleChange}
          placeholder="8"
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
          <Button onClick={onCancel} variant="secondary" name="Fortryd" />

          <Button
            type="submit"
            variant="primary"
            name={isSubmitting ? "Opdaterer..." : "Opdater opgave"}
          />
        </div>
      </FormLayout>
    </>
  );
};

export default TaskEditForm;

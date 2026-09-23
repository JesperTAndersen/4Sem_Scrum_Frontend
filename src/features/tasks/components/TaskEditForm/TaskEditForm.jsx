import styles from "./TaskEditForm.module.css";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateTask } from "../../utils/validateTask";
import { useState } from "react";

const TaskEditForm = ({ task, onSubmit, onCancel, competences }) => {
  const [formData, setFormData] = useState({
    stageId: task.stageId,
    name: task.name,
    estimate: task.estimate,
    compentenceIds: task?.compentenceIds,
  });
  const [errors, setErrors] = useState({
    name: "",
    estimate: "",
    compentenceIds: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } = validateTask(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    if (hasErrors) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ ...formData });
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
          label={"Vælg en kompetence til opgaven"}
          name={"compentenceIds"}
          options={competences}
          value={task.competences}
          onChange={handleChange}
          hasError={!!errors.compentenceIds}
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

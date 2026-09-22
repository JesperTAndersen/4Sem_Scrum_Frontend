import styles from "./TaskCreateForm.module.css";
import { useState } from "react";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateTask } from "../../utils/validateTask";

import { useNotification } from "@/context/NotificationContext";

const TaskCreateForm = ({ onSubmit, onCancel, stageId, competences = [] }) => {
  const { notify } = useNotification();
  const [formData, setFormData] = useState({
    stageId: stageId,
    name: "",
    estimate: "",
    compentenceIds: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    estimate: "",
    compentenceIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

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
        ...formData,
      };
      await onSubmit(payload);
    } catch (error) {
      notify("error", error || "Noget gik galt ved oprettelsen");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormHeader
        title="Opret opgave"
        subtitle="Tilføj en ny opgave til etappen"
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
        onChange={handleChange}
        hasError={!!errors.compentenceIds}
        required
      />

      <Input
        label="Tids estimering"
        type="number"
        name="estimate"
        value={formData.name}
        onChange={handleChange}
        placeholder="8"
        hasError={!!errors.estimate}
        errorMessage={errors.estimate}
        required
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
          name={isSubmitting ? "Opretter..." : "Opret opgave"}
          disabled={isSubmitting}
        />
      </div>
    </FormLayout>
  );
};

export default TaskCreateForm;

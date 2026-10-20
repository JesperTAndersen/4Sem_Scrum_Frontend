import styles from "./ProjectEditForm.module.css";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Select from "@/shared/components/filter/Select/Select";
import Input from "@/shared/components/ui/Input/Input";
import Textarea from "@/shared/components/ui/Input/Textarea";
import Button from "@/shared/components/ui/Button/Button";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import DayRangePicker from "@/shared/components/filter/DateRangePicker/DateRangePicker";
import { validateProject } from "../../utils/validateProject";
import { useState } from "react";
import { PROJECT_STATUSES } from "../../utils/constants";

const ProjectEditForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    startDate: project.startDate || "",
    deadline: project.deadline || "",
    status: project.status || "DRAFT",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    startDate: "",
    deadline: "",
    status: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { errors: validationErrors, hasErrors } = validateProject(formData);

    setErrors(validationErrors);

    if (hasErrors) return;

    const payload = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    };

    try {
      setIsSubmitting(true);
      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit}>
        <FormHeader
          title="Rediger projekt"
          subtitle="Opdater titel, beskrivelse og datoer"
        />
        <Input
          label="Projektets"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          hasError={!!errors.title}
          errorMessage={errors.title}
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={PROJECT_STATUSES}
          hasError={!!errors.status}
          errorMessage={errors.status}
          required
        />

        <Textarea
          label="Projektes beskrivelse"
          name="description"
          value={formData.description}
          onChange={handleChange}
          hasError={!!errors.description}
          errorMessage={errors.description}
          maxLength={200}
        />

        <DayRangePicker
          startDate={formData.startDate}
          endDate={formData.deadline}
          onChange={({ startDate, endDate }) => {
            setFormData((prev) => ({
              ...prev,
              startDate,
              deadline: endDate,
            }));
          }}
        />

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            name={isSubmitting ? "Opdaterer..." : "Opdater projekt"}
          />
          <Button onClick={onCancel} variant="secondary" name="Fortryd" />
        </div>
      </FormLayout>
    </>
  );
};

export default ProjectEditForm;

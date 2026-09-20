import styles from "./StageCreateForm.module.css";
import { useState } from "react";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateStage } from "../utils/validateStage";
import { useNotification } from "@/context/NotificationContext";

const StageCreateForm = ({ onSubmit, onCancel, projectId }) => {
  const { notify } = useNotification();
  const [formData, setFormData] = useState({ projectId: projectId, name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } = validateStage(formData);

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
        title="Opret station"
        subtitle="Tilføj en ny etape til projektet"
      />
      <Input
        label="Etape navn"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Fx. Afslibning af sildebensparket"
        hasError={!!errors.name}
        errorMessage={errors.name}
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
          name={isSubmitting ? "Opretter..." : "Opret etape"}
          disabled={isSubmitting}
        />
      </div>
    </FormLayout>
  );
};

export default StageCreateForm;

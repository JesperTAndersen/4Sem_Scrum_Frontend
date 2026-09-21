import styles from "./StageEditForm.module.css";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateStage } from "../utils/validateStage";
import { useState } from "react";

const StageEditForm = ({ competence, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: competence.name });
  const [errors, setErrors] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } =
      validateStage(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    if (hasErrors) return;

    try {
      setIsSubmitting(true);
      await onSubmit( {...formData } );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit}>
        <FormHeader
          title="Rediger etape"
          subtitle="Opdater navn"
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
          <Button onClick={onCancel} variant="secondary" name="Fortryd" />

          <Button
            type="submit"
            variant="primary"
            name={isSubmitting ? "Opdaterer..." : "Opdater etape"}
          />
        </div>
      </FormLayout>
    </>
  );
};

export default StageEditForm;

import styles from "./CompetenceCreateForm.module.css";
import { useState } from "react";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateCompetence } from "../../utils/validateCompetence";
import { useNotification } from "@/context/NotificationContext";

const CompetenceCreateForm = ({ onSubmit, onCancel }) => {
  const { notify } = useNotification();
  const [formData, setFormData] = useState({ name: "", rate: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", rate: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } =
      validateCompetence(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        rate: Number(formData.rate),
      };
      await onSubmit(payload);
    } catch (error) {
      const backendError = error.message?.toLowerCase() || "";

      if (
        backendError.includes("already exists") ||
        backendError.includes("name")
      ) {
        setErrors((prev) => ({
          ...prev,
          name: "Dette kompetencenavn findes allerede",
        }));
      } else {
        notify("error", error.message || "Noget gik galt ved oprettelsen");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormHeader
        title="Opret station"
        subtitle="Tilføj en ny køkkenstation til systemet"
      />
      <Input
        label="Kompetencenavn"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Fx. Maler"
        hasError={!!errors.name}
        errorMessage={errors.name}
        required
      />

      <Input
        label="Timepris (Rate)"
        type="number"
        name="rate"
        value={formData.rate}
        onChange={handleChange}
        placeholder="Fx. 850"
        hasError={!!errors.rate}
        errorMessage={errors.rate}
        min="0"
        step="0.01"
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
          name={isSubmitting ? "Opretter..." : "Opret kompetence"}
          disabled={isSubmitting}
        />
      </div>
    </FormLayout>
  );
};

export default CompetenceCreateForm;

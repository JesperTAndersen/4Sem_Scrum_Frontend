import styles from "./CompetenceEditForm.module.css";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateCompetence } from "../../utils/validateCompetence";
import { useState } from "react";

const CompetenceEditForm = ({ competence, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: competence.name,
    rate: competence.rate,
  });
  const [errors, setErrors] = useState({ name: "", rate: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, hasErrors } =
      validateCompetence(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    if (hasErrors) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formData,
        rate: Number(formData.rate),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit}>
        <FormHeader
          title="Rediger station"
          subtitle="Opdater navn og beskrivelse"
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
          <Button onClick={onCancel} variant="secondary" name="Fortryd" />

          <Button
            type="submit"
            variant="primary"
            name={isSubmitting ? "Opdaterer..." : "Opdater kompetence"}
          />
        </div>
      </FormLayout>
    </>
  );
};

export default CompetenceEditForm;

import styles from "./EmployeeCreateForm.module.css";
import { useState } from "react";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import FormHeader from "@/shared/components/layout/FormHeader/FormHeader";
import { validateEmployee } from "../../utils/validateEmployee";
import { useNotification } from "@/context/NotificationContext";

const EmployeeCreateForm = ({ onSubmit, onCancel }) => {
  const { notify } = useNotification();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", standardCapacity: "true", daily });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ firstName: "", lastName: "", standardCapacity: "true", daily });

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
      validateEmployee(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        dailyCapacity: Number(formData.rate),
      };
      await onSubmit(payload);
    } catch (error) {
        notify("error", error.message || "Noget gik galt ved oprettelsen");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormHeader
        title="Opret Medarbejder"
        subtitle="Tilføj en ny medarbejder til systemet"
      />
      <Input
        label="Medarbejders fornavn"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Fx. Hans eller Lise"
        hasError={!!errors.firstName}
        errorMessage={errors.firstName}
        required
      />

            <Input
        label="Medarbejders efternavn"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Fx. Hansen eller Lisesen"
        hasError={!!errors.lastName}
        errorMessage={errors.lastName}
        required
      />

      <Input
        label="Daglig kapicitet"
        type="number"
        name="dailyCapacity"
        value={formData.dailyCapacity}
        onChange={handleChange}
        placeholder="Fx. 7.5"
        hasError={!!errors.dailyCapacity}
        errorMessage={errors.dailyCapacity}
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
          name={isSubmitting ? "Opretter..." : "Opret medarbejder"}
          disabled={isSubmitting}
        />
      </div>
    </FormLayout>
  );
};

export default EmployeeCreateForm;

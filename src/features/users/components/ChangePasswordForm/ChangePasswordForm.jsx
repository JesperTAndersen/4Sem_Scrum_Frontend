import styles from "./ChangePasswordForm.module.css";
import { useState } from "react";
import Section from "@/shared/components/layout/Section/Section";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import { validateChangePassword } from "@/features/auth/utils/authValidators";
import { useNotification } from "@/context/NotificationContext";

const emptyErrors = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { notify } = useNotification();
  const [errors, setErrors] = useState(emptyErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { errors: validationErrors, hasErrors } =
      validateChangePassword(formData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors(emptyErrors);
    } catch (error) {
      if (error.message.toLowerCase().includes("current password")) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Den nuværende adgangskode er forkert",
        }));
      } else {
        notify("error", error.message || "Der opstod en fejl. Prøv igen.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section title="Skift adgangskode">
      <FormLayout onSubmit={handleSubmit}>
        <Input
          label="Nuværende adgangskode"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Indtast nuværende adgangskode"
          hasError={!!errors.currentPassword}
          errorMessage={errors.currentPassword}
          required
        />

        <div className={styles.passwordGrid}>
          <div className={styles.passwordField}>
            <Input
              label="Ny adgangskode"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Indtast ny adgangskode"
              hasError={!!errors.newPassword}
              errorMessage={errors.newPassword}
              required
            />

            <p className={styles.passwordRequirements}>
              Minimum 8 tegn • 1 stort bogstav • 1 tal
            </p>
          </div>

          <Input
            label="Bekræft ny adgangskode"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Bekræft ny adgangskode"
            hasError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
            required
          />
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            type="submit"
            name={isSubmitting ? "Gemmer..." : "Skift adgangskode"}
          />
        </div>
      </FormLayout>
    </Section>
  );
};

export default ChangePasswordForm;

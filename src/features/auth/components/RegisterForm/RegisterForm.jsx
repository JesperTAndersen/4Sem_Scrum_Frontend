import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Input from "../../../../components/ui/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import Notification from "../../../../components/ui/Notification/Notification";
import FormLayout from "../../../../components/layout/FormLayout/FormLayout";
import { validateRegistration } from "../../utils/authValidators";
import { authErrorTranslations } from "../../utils/errorTranslations";
import styles from "./RegisterForm.module.css";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const { errors: validationErrors, hasErrors } =
      validateRegistration(formData);
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors(emptyForm);
    const { confirmPassword, ...newUser } = formData;

    setIsSubmitting(true);
    try {
      await onSubmit(newUser);
    } catch (error) {
      const translated =
        authErrorTranslations[error.message] ||
        "Der opstod en fejl. Tjek dine indtastninger.";
      if (error.message?.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: translated }));
      } else {
        setFormError(translated);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Notification message={formError} type="error" inline={true} />
      <FormLayout onSubmit={handleSubmit}>
        <Input
          label="Fornavn"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Fornavn"
          hasError={!!errors.firstName}
          errorMessage={errors.firstName}
          icon={<FiUser size={16} />}
          required
        />
        <Input
          label="Efternavn"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Efternavn"
          hasError={!!errors.lastName}
          errorMessage={errors.lastName}
          icon={<FiUser size={16} />}
          required
        />
        <Input
          label="Email adresse"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          hasError={!!errors.email}
          errorMessage={errors.email}
          icon={<FiMail size={16} />}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimum 8 tegn • 1 stort bogstav • 1 tal"
          hasError={!!errors.password}
          errorMessage={errors.password}
          icon={<FiLock size={16} />}
          required
        />

        <Input
          label="Bekræft password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Bekræft password"
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          icon={<FiLock size={16} />}
          required
        />

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="primary"
            name={isSubmitting ? "Opretter..." : "Opret bruger"}
            disabled={isSubmitting}
          />
          <Button
            type="button"
            onClick={onCancel}
            variant="highlight"
            name="Fortryd"
          />
        </div>
      </FormLayout>
    </>
  );
};

export default RegisterForm;

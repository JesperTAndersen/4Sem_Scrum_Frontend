import styles from "./ChangeEmailForm.module.css";
import { useState } from "react";
import Section from "@/shared/components/layout/Section/Section";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Input from "@/shared/components/ui/Input/Input";
import Button from "@/shared/components/ui/Button/Button";
import { validateEmail } from "@/utils/validation/validators";

const ChangeEmailForm = ({ onSubmit, currentEmail }) => {
  const [email, setEmail] = useState(currentEmail || "");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    if (email === currentEmail) {
      setError("Din valgte email er din nuværende email");
      return;
    }

    setError("");

    onSubmit({ email });
  };

  return (
    <Section title="Email indstillinger">
      <FormLayout onSubmit={handleSubmit}>
        <Input
          label="Email adresse"
          type="email"
          placeholder="Indtast ny email adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          hasError={!!error}
          errorMessage={error}
        />

        <div className={styles.actions}>
          <Button
            variant="primary"
            type="submit"
            name="Opdater email"
            disabled={!email || email === currentEmail}
          />
        </div>
      </FormLayout>
    </Section>
  );
};

export default ChangeEmailForm;

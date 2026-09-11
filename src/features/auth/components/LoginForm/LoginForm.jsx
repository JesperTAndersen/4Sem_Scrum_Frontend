import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import Button from "@/shared/components/ui/Button/Button";
import Input from "@/shared/components/ui/Input/Input";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";

const LoginForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(credentials);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input
        label="Email adresse"
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        icon={<FiMail size={16} />}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        icon={<FiLock size={16} />}
        required
      />
      <Button
        type="submit"
        variant="primary"
        name={isSubmitting ? "Logger ind..." : "Log ind"}
        disabled={isSubmitting}
      />
    </FormLayout>
  );
};

export default LoginForm;

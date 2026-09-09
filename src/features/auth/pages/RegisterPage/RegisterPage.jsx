import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "@/shared/components/ui/Logo";
import Notification from "@/shared/components/ui/Notification/Notification";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import authService from "../../services/authService";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formSuccess, setFormSuccess] = useState(null);

  const handleRegister = async (formData) => {
    const createdUser = await authService.register(formData);
    setFormSuccess(
      `Velkommen ${createdUser.firstName} ${createdUser.lastName}. Du viderestilles til login...`,
    );
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
      <Logo size="lg" className={styles.logo} />
      <h1 className={styles.title}>Opret bruger</h1>
      <p className={styles.subtitle}>
        Få adgang til dit digitale projektstyrings værktøj
      </p>

      <p className={styles.alreadyUser}>
        Allerede bruger?{" "}
        <Link to="/login" className={styles.loginLink}>
          Log ind
        </Link>
      </p>

      <Notification message={formSuccess} type="success" inline={true} />

      <RegisterForm onSubmit={handleRegister} onCancel={() => navigate("/")} />
    </>
  );
};

export default RegisterPage;

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import Logo from '@/shared/components/ui/Logo';
import Button from '@/shared/components/ui/Button/Button';
import Notification from '@/shared/components/ui/Notification/Notification';
import LoginForm from '../../components/LoginForm/LoginForm';
import authService from '../../services/authService';
import styles from './LoginPage.module.css';

const errorTranslations = {
  'Invalid email or password': 'Email eller adgangskode er forkert.',
  'Missing email or password': 'Du skal udfylde både email og adgangskode.',
};

const roleRoutes = {
  HEAD_CHEF: '/admin/dashboard',
  SOUS_CHEF: '/admin/dashboard',
  LINE_COOK: '/kitchen',
  CUSTOMER: '/',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: saveSession } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (credentials) => {
    setErrorMessage(null);
    try {
      const { user, token } = await authService.login(credentials);
      saveSession(user, token);
      navigate(roleRoutes[user.userRole] || '/');
    } catch (error) {
      setErrorMessage( errorTranslations[error.message] || 'Der opstod en fejl ved login.');
    }
  };

  return (
    <>
      <Logo size="lg" className={styles.logo} />
      <h1 className={styles.title}>Log ind</h1>
      <p className={styles.subtitle}>
        Velkommen tilbage til dit digitale projekt styrings værktøj
      </p>

      <Notification message={errorMessage} type="error" inline={true} />
      <LoginForm onSubmit={handleLogin} />

      <p className={styles.noAccount}>
        Ingen bruger?{' '}
        <Link to="/register" className={styles.link}>
          Opret bruger
        </Link>
      </p>

      <div className={styles.backWrapper}>
        <Button
          name="Gå til forsiden"
          variant="secondary"
          onClick={() => navigate('/')}
        />
      </div>
    </>
  );
};

export default LoginPage;

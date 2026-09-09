import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AuthContext = createContext(null);

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('token');
    if (!t || isTokenExpired(t)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    return t;
  });

  const [user, setUser] = useState(() => {
    if (!localStorage.getItem('token')) return null;
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authMessage, setAuthMessage] = useState(null);

  const login = (userData, newToken) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleUnauthorized = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setAuthMessage(
        e?.detail?.message ?? 'Din session er udløbet. Log ind igen.',
      );
      navigate('/login');
    };

    const handleForbidden = () => {
      navigate('/forbidden');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    window.addEventListener('auth:forbidden', handleForbidden);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
      window.removeEventListener('auth:forbidden', handleForbidden);
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logOut, authMessage, setAuthMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

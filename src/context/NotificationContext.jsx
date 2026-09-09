import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const notify = (type, message, duration = 6000) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), duration);
  };

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

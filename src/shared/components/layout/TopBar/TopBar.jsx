import styles from "./TopBar.module.css";
import { FiBell } from "react-icons/fi";
import { useState } from "react";
import { useLocation, useNavigate, matchPath } from "react-router";
import { useAuth } from "@/context/AuthContext";
import LogOut from "../LogOut/LogOut";
import Avatar from "../../ui/Avatar/Avatar";
import {
  getGreetingWelcomeMessage,
  getTodaysFormattedDate,
} from "@/utils/dateHelpers";
import { formatUserRole } from "@/utils/formatters";

const routeLabels = [
  { route: "/dashboard", label: "Hjem" },
  { route: "/projects/:id", label: "Projektdetaljer" },
  { route: "/projects", label: "Projekter" },
  { route: "/employees/:id", label: "Medarbejderdetaljer" },
  { route: "/employees", label: "Medarbejdere" },
  { route: "/competences/:id", label: "Kompetencedetaljer" },
  { route: "/competences", label: "Kompetencer" },
  { route: "/users", label: "Brugere" },
  { route: "/capacity", label: "Kapacitet" },
  { route: "/profile", label: "Profil" },
];

const TopBar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { pathname } = useLocation();
  const [showBell, setShowBell] = useState(false);
  const greeting = getGreetingWelcomeMessage();
  const todaysDate = getTodaysFormattedDate();
  const pageTitle =
    routeLabels.find((r) => matchPath(r.route, pathname))?.label ?? "Estimo";

  return (
    <div className={styles.topBarContainer}>
      <div className={styles.welcomeContainer}>
        <span
          className={styles.greeting}
        >{`${greeting}, ${user.firstName}!`}</span>
        <span className={styles.date}>{todaysDate}</span>
      </div>

      <span className={styles.pageTitle}>{pageTitle}</span>

      <div className={styles.rightSection}>
        <div className={styles.bellWrapper}>
          <button
            className={styles.bellBtn}
            onClick={() => setShowBell((p) => !p)}
          >
            <FiBell className={styles.bell} />
          </button>

          {showBell && (
            <>
              <div
                className={styles.bellOverlay}
                onClick={() => setShowBell(false)}
              />
              <div className={styles.bellDropdown}>
                <p className={styles.bellEmpty}>Ingen notifikationer</p>
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => navigate("/profile")}
          className={styles.profileContainer}
        >
          <Avatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            size="md"
          />
          <div className={styles.profileInfo}>
            <span className={styles.name}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles.role}>{formatUserRole(user.role)}</span>
          </div>
        </div>

        <LogOut onLogOut={logOut} />
      </div>
    </div>
  );
};

export default TopBar;

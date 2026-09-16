import styles from "./TopBar.module.css";
import { FiBell } from "react-icons/fi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import LogOut from "../LogOut/LogOut";
import Avatar from "../../ui/Avatar/Avatar";
import {
  getGreetingWelcomeMessage,
  getTodaysFormattedDate,
} from "@/utils/dateHelpers";
import { formatUserRole } from "@/utils/formatters";

const routeLabels = [{ route: "/dashboard", label: "Hjem" }];

const TopBar = ({ snapshot }) => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { pathname } = useLocation();
  const [showBell, setShowBell] = useState(false);
  const greeting = getGreetingWelcomeMessage();
  const todaysDate = getTodaysFormattedDate();
  const pageTitle = routeLabels.find((r) => pathname.startsWith(r.route))?.label ?? "Estimo";

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
            {snapshot?.totalPending > 0 && (
              <span className={styles.badge}>
                {snapshot.totalPending > 99 ? "99+" : snapshot.totalPending}
              </span>
            )}
          </button>

          {showBell && (
            <>
              <div
                className={styles.bellOverlay}
                onClick={() => setShowBell(false)}
              />
              <div className={styles.bellDropdown}>
                {!snapshot?.totalPending ? (
                  <p className={styles.bellEmpty}>Ingen afventende opgaver</p>
                ) : (
                  <>
                    {snapshot?.pendingIngredientRequests > 0 && (
                      <button
                        className={styles.bellItem}
                        onClick={() => {
                          navigate("/admin/ingredient-requests");
                          setShowBell(false);
                        }}
                      >
                        <span className={styles.bellCount}>
                          {snapshot.pendingIngredientRequests}
                        </span>
                        Vareanmodninger afventer
                      </button>
                    )}
                    {snapshot?.pendingDishSuggestions > 0 && (
                      <button
                        className={styles.bellItem}
                        onClick={() => {
                          navigate("/admin/dish-suggestions");
                          setShowBell(false);
                        }}
                      >
                        <span className={styles.bellCount}>
                          {snapshot.pendingDishSuggestions}
                        </span>
                        Ret-forslag afventer
                      </button>
                    )}
                  </>
                )}
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
            <span className={styles.role}>
  {formatUserRole(user.userRole)}
</span>
          </div>
        </div>

        <LogOut onLogOut={logOut} />
      </div>
    </div>
  );
};

export default TopBar;

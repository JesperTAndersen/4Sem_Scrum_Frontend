import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./PublicHeader.module.css";
import LogIn from "../Login/Login";
import LogOut from "../LogOut/Logout";
import Logo from "../../ui/Logo/Logo";
import { useAuth } from "../../../context/AuthContext";

const PublicHeader = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logoContainer}>
          <Link to="/" onClick={closeMenu}>
            <Logo size="md" />
          </Link>
        </div>

        <button
          className={styles.burgerBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`${styles.menuContainer} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
          <nav className={styles.nav}>
            <NavLink
              to="/menu"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/takeaway"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              TakeAway
            </NavLink>
          </nav>

          <div className={styles.actions}>
            {user ? (
              <div onClick={closeMenu}>
                <LogOut onLogOut={logOut} />
              </div>
            ) : (
              <div onClick={closeMenu}>
                <LogIn to="/login" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;

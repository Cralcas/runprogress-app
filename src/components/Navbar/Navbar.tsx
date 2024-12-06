import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.scss";
import { Button } from "../Button/Button";
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

export const Navbar = () => {
  const { session, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.a} aria-label="Back to home page">
        <img
          className={styles.img}
          src="/images/desktop-logo.svg"
          alt="RunProgress logo"
        />
      </NavLink>
      <ul className={styles.ul}>
        {!session && isAuthPage && location.pathname === "/signup" && (
          <li>
            <Button
              size="default"
              variant="primary"
              onClick={() => navigate("/login")}
              aria-label="Login"
            >
              Login
            </Button>
          </li>
        )}

        {!session && isAuthPage && location.pathname === "/login" && (
          <li>
            <Button
              size="default"
              variant="primary"
              aria-label="Sign up"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </li>
        )}

        {session && !isAuthPage && (
          <>
            <li>
              <Button
                variant="icon"
                className={styles.iconButton}
                onClick={() => navigate("/profile")}
                aria-label="Profile"
                size="icon"
                type="button"
              >
                <MdAccountCircle className={styles.profile} />
                <span className={styles.iconText}>Profile</span>
              </Button>
            </li>
            <li>
              <Button
                variant="icon"
                className={styles.iconButton}
                onClick={handleLogout}
                aria-label="Logout"
                size="icon"
                type="button"
              >
                <IoIosLogOut className={styles.logout} />
                <span className={styles.iconText}>Logout</span>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
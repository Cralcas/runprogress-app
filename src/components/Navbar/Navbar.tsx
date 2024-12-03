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
          alt="Runprogress logo"
        />
      </NavLink>
      <ul className={styles.ul}>
        {!session && isAuthPage && location.pathname === "/signup" && (
          <li>
            <Button
              size="default"
              variant="primary"
              onClick={() => navigate("/login")}
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
                aria-label="Go to Profile"
              >
                <MdAccountCircle className={styles.profile} />
              </Button>
            </li>
            <li>
              <Button
                variant="icon"
                className={styles.iconButton}
                onClick={handleLogout}
                aria-label="Log out"
                size="icon"
                type="button"
              >
                <IoIosLogOut className={styles.logout} />
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

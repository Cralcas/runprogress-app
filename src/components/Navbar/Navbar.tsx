import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.scss";
import { Button } from "../Button/Button";

export const Navbar = () => {
  const { session, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav>
      <Link to="/" className={styles.a} aria-label="Go to home page">
        <img src="/images/mobile-logo.svg" alt="Runprogress logo" />
      </Link>
      <ul>
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
                size="default"
                variant="primary"
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
            </li>
            <li>
              <Button
                size="default"
                variant="primary"
                aria-label="Log out of your account"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

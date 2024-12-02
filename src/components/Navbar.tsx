import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { session, signOut } = useAuth();
  const location = useLocation();

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav>
      <div>Logo</div>
      <ul>
        {!session && !isAuthPage && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {!session && location.pathname === "/signup" && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {session && !isAuthPage && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../components/Auth/LoginForm";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <section className="form-section">
        <h1>Login</h1>
        <LoginForm />
        <span>
          Don't have an account?{" "}
          <Link to="/signup">
            <b>Sign up</b>
          </Link>
        </span>
      </section>
    </div>
  );
};

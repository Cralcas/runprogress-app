import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Login</h1>
      <LoginForm />
      <Link to="/signup">
        Don't have an account? <b>Sign up</b>
      </Link>
    </>
  );
};

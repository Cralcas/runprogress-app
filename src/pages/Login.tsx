import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
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

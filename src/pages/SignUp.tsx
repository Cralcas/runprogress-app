import { Link, Navigate } from "react-router-dom";
import { SignUpForm } from "../components/Auth/SignUpForm";
import { useAuth } from "../hooks/useAuth";

export const SignUp = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <section className="form-section">
        <h1>Sign Up</h1>
        <SignUpForm />
        <span>
          Already have an account?{" "}
          <Link to="/login">
            <b>Login</b>
          </Link>
        </span>
      </section>
    </div>
  );
};

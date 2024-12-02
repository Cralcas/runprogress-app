import { Navigate } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm";
import { useAuth } from "../hooks/useAuth";

export const SignUp = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

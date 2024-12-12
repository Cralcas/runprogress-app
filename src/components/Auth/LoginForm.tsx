import { FormEvent, useState } from "react";
import { supabase } from "../../database/supabase-client";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.scss";
import { Button } from "../Button/Button";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Login failed. Please try again.");
        return;
      }

      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <div className={styles.input}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.field}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.input}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.field}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <div className={styles.formButton}>
        <Button
          type="submit"
          size="large"
          variant="primary"
          disabled={loading}
          aria-label="Login"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

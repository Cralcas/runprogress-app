import { FormEvent, useState } from "react";
import styles from "./AuthForm.module.scss";
import { Button } from "../Button/Button";
import { supabase } from "../../database/supabase-client";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { data: createdUser } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: "http://localhost:5173/login",
        },
      });

      const emailIsTaken = createdUser.user?.identities?.length === 0;
      if (emailIsTaken) {
        setError("Email is already taken. Please use a different email.");
        return;
      }

      setSuccessMessage("Account created, confirm via email.");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleCreateUser}>
      <div className={styles.input}>
        <label htmlFor="username">Username</label>
        <input
          className={styles.field}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
          placeholder="min 6 characters"
        />
      </div>

      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}

      <div className={styles.formButton}>
        <Button
          type="submit"
          size="large"
          variant="primary"
          disabled={loading}
          aria-label="Sign up"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
};

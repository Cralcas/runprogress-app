import { FormEvent, useState } from "react";
import { signUpUser } from "../../services/userService";
import styles from "./AuthForm.module.scss";

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
      const data = await signUpUser(email, password, username);

      if (data?.user) {
        setSuccessMessage("Account created, confirm via email.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
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
        <button className={styles.largeButton} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

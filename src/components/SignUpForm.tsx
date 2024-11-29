import { FormEvent, useState } from "react";
import { supabase } from "../database/supabase-client";

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
      const { data: existingUser, error: usernameError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single();

      if (usernameError && usernameError.code !== "PGRST116") {
        setError("Error checking username availability.");
        setLoading(false);
        return;
      }

      if (existingUser) {
        setError("Username already taken. Please choose another.");
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (signUpError) {
        setError(`Error: ${signUpError.message}`);
        setLoading(false);
        return;
      }

      if (data.user) {
        setSuccessMessage("Account Created");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateUser}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && (
        <div>
          <span>{successMessage}</span>
        </div>
      )}

      <button disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

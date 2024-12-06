import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../database/supabase-client";

type UserProfile = {
  id: string;
  email: string | null;
  username: string | null;
} | null;

type SignUpResponse = {
  user: User | null;
  session: Session | null;
};

async function checkExistingUser(
  email: string,
  username: string
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, username")
    .or(`email.eq.${email},username.eq.${username}`)
    .maybeSingle();

  if (error) {
    console.error("Error checking existing user:", error);
    return null;
  }

  return data;
}

export async function signUpUser(
  email: string,
  password: string,
  username: string
): Promise<SignUpResponse> {
  const existingUser = await checkExistingUser(email, username);
  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error(
        "This email is already registered. Please use another one."
      );
    }
    if (existingUser.username === username) {
      throw new Error(
        "This username is already taken. Please choose a different one."
      );
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
      emailRedirectTo: "http://localhost:5173/login",
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

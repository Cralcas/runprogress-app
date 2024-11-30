import { supabase } from "../database/supabase-client";

export const checkExistingUser = async (username: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Failed to check existing username.");
  }

  return data ? data : null;
};

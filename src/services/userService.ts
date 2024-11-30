import { supabase } from "../database/supabase-client";

export const checkExistingUsername = async (username: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  return data || null; // Return data if found, otherwise null
};

export const checkExistingEmail = async (email: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  return data || null; // Return data if found, otherwise null
};

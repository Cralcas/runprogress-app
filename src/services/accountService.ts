import { supabase } from "../database/supabase-client";

export async function deleteAccount() {
  const { error } = await supabase.rpc("delete_user_account");

  if (error) {
    throw error;
  }
}

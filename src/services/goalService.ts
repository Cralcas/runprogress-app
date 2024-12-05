import { supabase } from "../database/supabase-client";

export const getGoal = async (userId: string, weekStart: string) => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .eq("week_start", weekStart)
      .maybeSingle();

    if (error) {
      console.error("Error finding goal: ", error.message);
      return;
    }

    return data;
  } catch (err) {
    console.error("Error fetching goal:", err);
    throw err;
  }
};

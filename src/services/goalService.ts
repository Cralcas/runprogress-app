import { supabase } from "../database/supabase-client";
import { getWeekStartDate } from "../utilities/dateFormat";

const weekStart = getWeekStartDate();

export const getGoal = async () => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .select("*")
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

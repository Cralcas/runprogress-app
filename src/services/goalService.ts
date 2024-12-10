import { supabase } from "../database/supabase-client";
import { getWeekInterval } from "../utilities/dateFormat";

interface IGoal {
  userId: string;
  newGoal: number;
}

interface IGoalResponse {
  created_at: string | null;
  goal_progress: number | null;
  id: string;
  updated_at: string | null;
  user_id: string;
  weekly_goal: number | null;
}

export async function getGoal(): Promise<IGoalResponse | null> {
  try {
    const { start, end } = getWeekInterval();

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .gte("created_at", start)
      .lte("created_at", end)
      .maybeSingle();

    if (error) {
      console.error("Error finding goal: ", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error fetching goal:", err);
    throw err;
  }
}

export async function saveGoal({ userId, newGoal }: IGoal) {
  try {
    const { error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: userId,
          weekly_goal: newGoal,
        },
      ])
      .single();

    if (error) {
      console.error("Error saving goal: ", error);
      return null;
    }
  } catch (err) {
    console.error("Error saving goal:", err);
    throw err;
  }
}

export async function updateGoal(existingGoal: IGoalResponse, newGoal: number) {
  try {
    const { start, end } = getWeekInterval();

    const { error } = await supabase
      .from("goals")
      .update({ weekly_goal: newGoal })
      .eq("id", existingGoal.id)
      .gte("created_at", start)
      .lte("created_at", end)
      .single();

    if (error) {
      console.error("Error updating goal: ", error);
      return null;
    }
  } catch (err) {
    console.error("Error updating goal:", err);
    throw err;
  }
}

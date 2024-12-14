import { supabase } from "../database/supabase-client";
import { getWeekInterval } from "../utilities/dateFormat";

interface IGoalResponse {
  goal_progress: number;
  id: string;
  user_id: string;
  weekly_goal: number;
}

export async function getGoal(
  start: string,
  end: string
): Promise<IGoalResponse> {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .maybeSingle();

  if (error || !data) {
    throw error;
  }

  return data;
}

export async function createGoal(userId: string, newGoal: number) {
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
    console.error("Error saving goal:", error);
    throw error;
  }
}

export async function updateGoal(existingGoal: IGoalResponse, newGoal: number) {
  const { start, end } = getWeekInterval();

  const { error } = await supabase
    .from("goals")
    .update({ weekly_goal: newGoal })
    .eq("id", existingGoal.id)
    .gte("created_at", start)
    .lte("created_at", end)
    .single();

  if (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
}

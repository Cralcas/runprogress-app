import { supabase } from "../database/supabase-client";
import { IGoalData } from "../models/IGoalData";
import { GoalType } from "../models/types";
import { getWeekInterval } from "../utilities/dateFormat";

export async function getGoal(start: string, end: string): Promise<GoalType> {
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
  const { error } = await supabase.from("goals").insert([
    {
      user_id: userId,
      weekly_goal: newGoal,
    },
  ]);

  if (error) {
    console.error("Error saving goal:", error);
    throw error;
  }
}

export async function updateGoal(existingGoal: IGoalData, newGoal: number) {
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

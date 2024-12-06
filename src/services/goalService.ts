import { supabase } from "../database/supabase-client";

interface IGoal {
  weekStart: string;
  userId: string;
  newGoal: number;
}

interface IGoalResponse {
  created_at: string | null;
  goal_progress: number | null;
  id: string;
  updated_at: string | null;
  user_id: string;
  week_start: string;
  weekly_goal: number | null;
}

export async function getGoal(
  weekStart: string
): Promise<IGoalResponse | null> {
  try {
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("week_start", weekStart)
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

export async function saveGoal({ weekStart, userId, newGoal }: IGoal) {
  try {
    const { error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: userId,
          weekly_goal: newGoal,
          week_start: weekStart,
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

export async function updateGoal({
  weekStart,
  newGoal,
}: {
  weekStart: string;
  newGoal: number;
}) {
  try {
    const { data: existingGoal, error } = await supabase
      .from("goals")
      .select("*")
      .eq("week_start", weekStart)
      .maybeSingle();

    if (error) {
      console.error("Error finding goal: ", error);
      return null;
    }

    if (!existingGoal) {
      console.error("No existing goal found for the week");
      return null;
    }

    const { error: updateError } = await supabase
      .from("goals")
      .update({ weekly_goal: newGoal })
      .eq("id", existingGoal.id)
      .single();

    if (updateError) {
      console.error("Error updating goal: ", updateError);
      return null;
    }
  } catch (err) {
    console.error("Error updating goal:", err);
    throw err;
  }
}

import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Progress } from "../components/Progress/Progress";
import { getWeekStartDate } from "../utilities/dateFormat";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { GoalForm } from "../GoalForm.tsx/GoalForm";
import { getGoal } from "../services/goalService";
import { supabase } from "../database/supabase-client";

export const Home = () => {
  const [goalData, setGoalData] = useState({ goal: 0, progress: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchGoalAndProgress = async () => {
      setLoading(true);

      try {
        const data = await getGoal();

        if (data) {
          setGoalData({
            goal: data.weekly_goal || 0,
            progress: data.goal_progress || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalAndProgress();
  }, []);

  const handleSetGoal = async (newGoal: number) => {
    const weekStart = getWeekStartDate();

    const { data: existingGoal, error: fetchError } = await supabase
      .from("goals")
      .select("*")
      .eq("week_start", weekStart)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching existing goal:", fetchError.message);
      return;
    }

    let response;
    if (existingGoal) {
      response = await supabase
        .from("goals")
        .update({ weekly_goal: newGoal })
        .eq("id", existingGoal.id);
    } else {
      response = await supabase
        .from("goals")
        .insert([{ weekly_goal: newGoal, week_start: weekStart }]);
    }

    if (response.error) {
      console.error("Error saving goal:", response.error.message);
      return;
    }

    setGoalData((prevData) => ({
      ...prevData,
      goal: newGoal,
    }));

    setShowModal(false);
  };

  return (
    <section className="home-section">
      <div className="home-goal">
        <h3>Weekly goal</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Progress goal={goalData.goal} progress={goalData.progress} />
        )}

        <div className="goal-buttons">
          <Button type="button" onClick={() => setShowModal(true)}>
            Set Goal
          </Button>
        </div>
      </div>

      {showModal && (
        <GoalModal onClose={() => setShowModal(false)}>
          <GoalForm onSetGoal={handleSetGoal} currentGoal={goalData.goal} />
        </GoalModal>
      )}
      <div className="home-posts">Posts</div>
    </section>
  );
};

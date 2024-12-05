import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Progress } from "../components/Progress/Progress";
import { supabase } from "../database/supabase-client";
import { getWeekStartDate } from "../utilities/dateFormat";
import { useAuth } from "../hooks/useAuth";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { GoalForm } from "../GoalForm.tsx/GoalForm";

export const Home = () => {
  const { user } = useAuth();
  const [goal, setGoal] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGoalAndProgress = async () => {
      if (!user?.id) {
        console.warn("User ID is undefined.");
        return;
      }

      setLoading(true);

      try {
        const weekStart = getWeekStartDate();
        // const now = new Date().toISOString();
        const { data, error } = await supabase

          .from("goals")
          .select("*")
          .eq("user_id", user.id)
          .eq("week_start", weekStart)
          .maybeSingle();

        if (error) {
          console.error("Error fetching goal:", error);
        } else if (data) {
          setGoal(data.weekly_goal || 0);
          setProgress(data.goal_progress || 0);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalAndProgress();
  }, [user?.id]);

  const handleSetGoal = (newGoal: number) => {
    setGoal(newGoal);
    setShowModal(false);
  };

  return (
    <section className="home-section">
      <div className="home-goal">
        <h3>Weekly goal</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Progress goal={goal} progress={progress} />
        )}

        <div className="goal-buttons">
          <Button type="button" onClick={() => setShowModal(true)}>
            Set Goal
          </Button>
        </div>
      </div>

      {showModal && (
        <GoalModal onClose={() => setShowModal(false)}>
          <GoalForm onSetGoal={handleSetGoal} />
        </GoalModal>
      )}
      <div className="home-posts">Posts</div>
    </section>
  );
};

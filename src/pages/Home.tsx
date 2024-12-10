import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Progress } from "../components/Progress/Progress";
import { getWeekInterval } from "../utilities/dateFormat";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { GoalForm } from "../components/GoalForm.tsx/GoalForm";
import { getGoal, saveGoal, updateGoal } from "../services/goalService";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../database/supabase-client";
import { PostModal } from "../components/PostModal/PostModal";
import { PostForm } from "../components/PostForm/PostForm";

interface IGoalData {
  goal: number;
  progress: number;
}

export const Home = () => {
  const { user } = useAuth();
  const [goalData, setGoalData] = useState<IGoalData>({ goal: 0, progress: 0 });
  const [loading, setLoading] = useState(false);
  const [modals, setModals] = useState({
    goalModal: false,
    postModal: false,
  });

  function toggleModal(modalName: keyof typeof modals) {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  }

  useEffect(() => {
    async function loadGoalData() {
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
        console.error("Error loading goal data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGoalData();
  }, []);

  async function handleSetGoal(newGoal: number) {
    if (!user) {
      console.error("User is undefined");
      return;
    }

    const { start, end } = getWeekInterval();

    try {
      const { data: existingGoal } = await supabase
        .from("goals")
        .select("*")
        .gte("created_at", start)
        .lte("created_at", end)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingGoal) {
        await updateGoal(existingGoal, newGoal);
      } else {
        await saveGoal({ userId: user.id, newGoal });
      }

      setGoalData((prevData) => ({
        ...prevData,
        goal: newGoal,
      }));
    } catch (error) {
      console.error("Error in handleSetGoal:", error);
    }

    toggleModal("goalModal");
  }

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
          <Button type="button" onClick={() => toggleModal("goalModal")}>
            Set Goal
          </Button>
          <Button type="button" onClick={() => toggleModal("postModal")}>
            + Create Post
          </Button>
        </div>
      </div>

      {modals.goalModal && (
        <GoalModal onClose={() => toggleModal("goalModal")}>
          <GoalForm onSetGoal={handleSetGoal} currentGoal={goalData.goal} />
        </GoalModal>
      )}

      {modals.postModal && (
        <PostModal onClose={() => toggleModal("postModal")}>
          <PostForm />
        </PostModal>
      )}

      <div className="home-posts">Posts</div>
    </section>
  );
};

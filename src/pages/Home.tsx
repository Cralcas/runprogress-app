import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Progress } from "../components/Progress/Progress";
import { getWeekInterval } from "../utilities/dateFormat";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { getGoal, createGoal, updateGoal } from "../services/goalService";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../database/supabase-client";
import { PostModal } from "../components/PostModal/PostModal";
import { IPost } from "../components/PostForm/PostForm";
import { savePost } from "../services/postService";

interface IGoalData {
  goal: number;
  progress: number;
}

interface IWeekInterval {
  start: string;
  end: string;
}

export const Home = () => {
  const { user } = useAuth();
  const [goalData, setGoalData] = useState<IGoalData>({ goal: 0, progress: 0 });
  const [weekInterval, setWeekInterval] = useState<IWeekInterval>({
    start: "",
    end: "",
  });
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
        const currentWeek = getWeekInterval();

        setWeekInterval({
          start: currentWeek.start,
          end: currentWeek.end,
        });

        const data = await getGoal(currentWeek.start, currentWeek.end);

        setGoalData({
          goal: data.weekly_goal,
          progress: data.goal_progress,
        });
      } catch (error) {
        console.error("Error loading goal data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGoalData();
  }, []);

  async function handleSubmitGoal(newGoal: number) {
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
        await createGoal({ userId: user.id, newGoal });
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

  async function handleSubmitPost(post: IPost) {
    if (!user) {
      console.error("User is undefined");
      return;
    }

    await savePost(post, user.id);

    const updatedGoal = await getGoal(weekInterval.start, weekInterval.end);

    setGoalData((prevGoalData) => ({
      ...prevGoalData,
      progress: updatedGoal.goal_progress,
    }));
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
      <div className="home-posts">Posts</div>

      {modals.goalModal && (
        <GoalModal
          onClose={() => toggleModal("goalModal")}
          handleSubmitGoal={handleSubmitGoal}
          currentGoal={goalData.goal}
        ></GoalModal>
      )}

      {modals.postModal && (
        <PostModal
          onClose={() => toggleModal("postModal")}
          handleSubmitPost={handleSubmitPost}
        ></PostModal>
      )}
    </section>
  );
};

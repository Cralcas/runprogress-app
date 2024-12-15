import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Progress } from "../components/Progress/Progress";
import { getWeekInterval } from "../utilities/dateFormat";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { getGoal, createGoal, updateGoal } from "../services/goalService";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../database/supabase-client";
import { PostModal } from "../components/PostModal/PostModal";
import { createPost, getPosts } from "../services/postService";
import { PostType } from "../models/types";
import { PostCard } from "../components/PostCard/PostCard";
import { IPost } from "../models/IPost";

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
  const [posts, setPosts] = useState<PostType[]>([]);

  const currentWeek = getWeekInterval();

  const [weekInterval, setWeekInterval] = useState<IWeekInterval>({
    start: currentWeek.start,
    end: currentWeek.end,
  });

  const [modals, setModals] = useState({
    goalModal: false,
    postModal: false,
  });
  const [loading, setLoading] = useState(false);

  function toggleModal(modalName: keyof typeof modals) {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  }

  async function loadGoalAndPosts(currentWeek: IWeekInterval) {
    setLoading(true);
    try {
      const fetchedGoalData = await getGoal(currentWeek.start, currentWeek.end);
      const fetchedPosts = await getPosts(currentWeek.start, currentWeek.end);

      setGoalData({
        goal: fetchedGoalData.weekly_goal,
        progress: fetchedGoalData.goal_progress,
      });

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error loading goal data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGoalAndPosts(weekInterval);
  }, [weekInterval]);

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
        await createGoal(user.id, newGoal);
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

    const newPost = await createPost(post, user.id);

    setPosts([newPost, ...posts]);
    setGoalData((prevGoalData) => ({
      ...prevGoalData,
      progress: prevGoalData.progress + post.distance,
    }));
  }
  useEffect(() => {
    console.log("Posts:", posts);
    console.log("Goaldata:", goalData);
  }, [posts, goalData]);
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

      <div className="home-posts">
        <div className="post-container">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>

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

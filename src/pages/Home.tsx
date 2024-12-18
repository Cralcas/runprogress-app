import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Progress } from "../components/Progress/Progress";
import { getWeekInterval } from "../utilities/dateFormat";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { getGoal, createGoal, updateGoal } from "../services/goalService";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../database/supabase-client";
import { PostModal } from "../components/PostModal/PostModal";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../services/postService";
import { PostType } from "../models/types";
import { PostCard } from "../components/PostCard/PostCard";
import { PostCreate } from "../models/IPost";
import { IGoalData } from "../models/IGoalData";
import { Spinner } from "../components/Spinner/Spinner";

interface IWeekInterval {
  start: string;
  end: string;
}

export const Home = () => {
  const { user } = useAuth();
  const [goalData, setGoalData] = useState<IGoalData>({ goal: 0, progress: 0 });
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postToEdit, setPostToEdit] = useState<PostType | null>(null);

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

  async function handleSubmitPost(post: PostCreate) {
    if (!user) {
      console.error("User is undefined");
      return;
    }

    let updatedPost: PostType;

    if (postToEdit) {
      updatedPost = await updatePost(postToEdit.id, post);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );

      setGoalData((prevGoalData) => ({
        ...prevGoalData,
        progress:
          prevGoalData.progress - postToEdit.distance + updatedPost.distance,
      }));
    } else {
      updatedPost = await createPost(post, user.id);

      setPosts([updatedPost, ...posts]);
      setGoalData((prevGoalData) => ({
        ...prevGoalData,
        progress: prevGoalData.progress + updatedPost.distance,
      }));
    }

    setPostToEdit(null);
  }

  function handleEditPost(post: PostType) {
    console.log("Editing Post ID:", post.id);
    setPostToEdit(post);
    toggleModal("postModal");
  }

  async function removePost(id: string) {
    const removedPost = await deletePost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setGoalData((prevGoalData) => ({
      ...prevGoalData,
      progress: prevGoalData.progress - removedPost.distance,
    }));
  }

  return (
    <section className="home-section">
      <div className="home-goal">
        {loading ? (
          <Spinner />
        ) : (
          <Progress goal={goalData.goal} progress={goalData.progress} />
        )}

        <div className="goal-buttons">
          <Button
            type="button"
            size="default"
            onClick={() => toggleModal("goalModal")}
          >
            Set Goal
          </Button>

          {goalData.goal !== 0 && (
            <Button
              type="button"
              size="default"
              onClick={() => {
                setPostToEdit(null);
                toggleModal("postModal");
              }}
            >
              + Create Post
            </Button>
          )}
        </div>
      </div>

      <div className="home-posts">
        <div className="post-container">
          {goalData.goal === 0 ? (
            <h3>Set a goal to track your progress.</h3>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                post={post}
                key={post.id}
                removePost={removePost}
                editPost={handleEditPost}
              />
            ))
          ) : (
            <h3>You have no posts for this week</h3>
          )}
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
          postToEdit={postToEdit}
        ></PostModal>
      )}
    </section>
  );
};

import { useEffect, useState } from "react";
import { getWeekInterval } from "../utilities/dateFormat";
import { GoalModal } from "../components/GoalModal/GoalModal";
import { getGoal, createGoal, updateGoal } from "../services/goalService";
import { useAuth } from "../hooks/useAuth";

import { PostModal } from "../components/PostModal/PostModal";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../services/postService";
import { PostType } from "../models/types";
import { PostCreate } from "../models/IPost";
import { IGoalData } from "../models/IGoalData";
import { GoalSection } from "../components/GoalSection/GoalSection";
import { PostSection } from "../components/PostSection/PostSection";

interface IWeekInterval {
  start: string;
  end: string;
}

export const Home = () => {
  const { user } = useAuth();
  const [goalData, setGoalData] = useState<IGoalData>({
    id: "",
    weekly_goal: 0,
    goal_progress: 0,
  });
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

  const [loadingGoal, setLoadingGoal] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  function toggleModal(modalName: keyof typeof modals) {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  }

  const closeGoalModal = () => {
    toggleModal("goalModal");
  };

  const closePostModal = () => {
    toggleModal("postModal");
  };

  async function loadGoalAndPosts(currentWeek: IWeekInterval) {
    setLoadingGoal(true);
    setLoadingPosts(true);
    try {
      const fetchedGoalData = await getGoal(currentWeek.start, currentWeek.end);
      const fetchedPosts = await getPosts(currentWeek.start, currentWeek.end);

      setGoalData({
        id: fetchedGoalData.id,
        weekly_goal: fetchedGoalData.weekly_goal,
        goal_progress: fetchedGoalData.goal_progress,
      });

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error loading goal data:", error);
    } finally {
      setLoadingGoal(false);
      setLoadingPosts(false);
    }
  }

  useEffect(() => {
    loadGoalAndPosts(weekInterval);
  }, [weekInterval]);

  async function handleSubmitGoal(newGoal: number) {
    if (!user) return;

    try {
      if (goalData.weekly_goal > 0) {
        await updateGoal(goalData, newGoal);
      } else {
        await createGoal(user.id, newGoal);
      }

      setGoalData((prevData) => ({
        ...prevData,
        weekly_goal: newGoal,
      }));
    } catch (error) {
      console.error("Error in handleSubmitGoal:", error);
    }

    toggleModal("goalModal");
  }

  async function handleSubmitPost(post: PostCreate) {
    if (!user) return;

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
        goal_progress:
          prevGoalData.goal_progress -
          postToEdit.distance +
          updatedPost.distance,
      }));
    } else {
      updatedPost = await createPost(post, user.id);

      setPosts([updatedPost, ...posts]);
      setGoalData((prevGoalData) => ({
        ...prevGoalData,
        goal_progress: prevGoalData.goal_progress + updatedPost.distance,
      }));
    }

    setPostToEdit(null);
  }

  function handleEditPost(post: PostType) {
    setPostToEdit(post);
    toggleModal("postModal");
  }

  async function removePost(id: string) {
    const removedPost = await deletePost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setGoalData((prevGoalData) => ({
      ...prevGoalData,
      goal_progress: prevGoalData.goal_progress - removedPost.distance,
    }));
  }

  const resetPostEditing = () => {
    setPostToEdit(null);
    toggleModal("postModal");
  };

  return (
    <section className="home-section">
      <GoalSection
        goalData={goalData}
        loading={loadingGoal}
        closeGoalModal={closeGoalModal}
        resetPostEditing={resetPostEditing}
      />

      <div className="home-posts">
        <PostSection
          goalData={goalData}
          removePost={removePost}
          editPost={handleEditPost}
          loading={loadingPosts}
          posts={posts}
        />
      </div>

      {modals.goalModal && (
        <GoalModal
          onClose={closeGoalModal}
          handleSubmitGoal={handleSubmitGoal}
          currentGoal={goalData.weekly_goal}
        ></GoalModal>
      )}

      {modals.postModal && (
        <PostModal
          onClose={closePostModal}
          handleSubmitPost={handleSubmitPost}
          postToEdit={postToEdit}
        ></PostModal>
      )}
    </section>
  );
};

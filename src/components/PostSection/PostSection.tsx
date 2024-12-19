import { IGoalData } from "../../models/IGoalData";
import { PostType } from "../../models/types";
import { PostCard } from "../PostCard/PostCard";
import { Spinner } from "../Spinner/Spinner";
import styles from "./PostSection.module.scss";

interface PostSectionProps {
  goalData: IGoalData;
  posts: PostType[];
  removePost: (id: string) => void;
  editPost: (post: PostType) => void;
  loading: boolean;
}

export const PostSection = ({
  posts,
  goalData,
  removePost,
  editPost,
  loading,
}: PostSectionProps) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.postsContainer}>
      {goalData.weekly_goal === 0 ? (
        <h3>Set a goal to track your progress.</h3>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            post={post}
            key={post.id}
            removePost={removePost}
            editPost={editPost}
          />
        ))
      ) : (
        <h3>You have no posts for this week</h3>
      )}
    </div>
  );
};

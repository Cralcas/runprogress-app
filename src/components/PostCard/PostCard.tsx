import { PostType } from "../../models/types";
import styles from "./PostCard.module.scss";

interface PostCardProps {
  post: PostType;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className={styles.cardBody}>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
      <div>
        <div>{post.distance} km</div>
        <div>{post.pace}</div>
        <div>{post.time}</div>
      </div>
    </div>
  );
};

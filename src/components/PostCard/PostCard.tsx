import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { PostType } from "../../models/types";
import styles from "./PostCard.module.scss";
import { Button } from "../Button/Button";
import { formatTime } from "../../utilities/formatTime";

interface PostCardProps {
  post: PostType;
  removePost: (id: string) => void;
  editPost: (post: PostType) => void;
}

export const PostCard = ({ post, removePost, editPost }: PostCardProps) => {
  function handleRemove() {
    removePost(post.id);
  }

  function handleEdit() {
    editPost(post);
  }

  const formattedTime = formatTime(post.time);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>{post.title}</h4>
        <div className={styles.buttons}>
          <Button
            variant="icon"
            className={styles.iconButton}
            aria-label="Logout"
            size="icon"
            type="button"
            onClick={handleEdit}
          >
            <MdEdit className={styles.edit} />
          </Button>
          <Button
            variant="icon"
            className={styles.iconButton}
            onClick={handleRemove}
            aria-label="Logout"
            size="icon"
            type="button"
          >
            <MdDeleteOutline className={styles.delete} />
          </Button>
        </div>
      </div>

      <p>{post.description}</p>
      <div>
        <div className={styles.stats}>
          <div className={styles.statsValue}>
            <span className={styles.statTitle}>Distance</span>
            <span>{post.distance} km</span>
          </div>
          {post.pace && (
            <div className={styles.statsValue}>
              <span className={styles.statTitle}>Pace</span>
              <span>{post.pace} /km</span>
            </div>
          )}
          <div className={styles.statsValue}>
            <span className={styles.statTitle}>Time</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

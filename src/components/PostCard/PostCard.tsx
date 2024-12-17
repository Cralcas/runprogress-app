import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { PostType } from "../../models/types";
import styles from "./PostCard.module.scss";
import { Button } from "../Button/Button";

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

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <h4 className={styles.title}>{post.title}</h4>
        <div className={styles.buttonContainer}>
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
      <div className={styles.content}>
        <p>{post.description}</p>
        <div className={styles.stats}>
          <div>{post.distance} km</div>
          <div>{post.pace}</div>
          <div>{post.time}</div>
        </div>
      </div>
    </div>
  );
};

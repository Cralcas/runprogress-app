import styles from "./PostModal.module.scss";
import { Button } from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { PostForm } from "../PostForm/PostForm";
import { PostCreate } from "../../models/IPost";
import { PostType } from "../../models/types";

interface PostModalProps {
  onClose: () => void;
  handleSubmitPost: (post: PostCreate) => void;
  postToEdit: PostType | null;
}

export const PostModal = ({
  onClose,
  handleSubmitPost,
  postToEdit,
}: PostModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          size="icon"
          variant="icon"
          className={styles.iconButton}
          onClick={onClose}
        >
          <IoIosClose />
        </Button>
        <h2 className={styles.header}>Post</h2>
        <PostForm
          toggleModal={onClose}
          handleSubmitPost={handleSubmitPost}
          postToEdit={postToEdit}
        />
      </div>
    </div>
  );
};

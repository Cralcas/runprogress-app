import styles from "./PostModal.module.scss";
import { Button } from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { PostForm } from "../PostForm/PostForm";
import { IPost } from "../../models/IPost";

interface PostModalProps {
  onClose: () => void;
  handleSubmitPost: (post: IPost) => void;
}

export const PostModal = ({ onClose, handleSubmitPost }: PostModalProps) => {
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
        <PostForm toggleModal={onClose} handleSubmitPost={handleSubmitPost} />
      </div>
    </div>
  );
};

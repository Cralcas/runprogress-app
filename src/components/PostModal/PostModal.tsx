import { ReactNode } from "react";

import styles from "./PostModal.module.scss";
import { Button } from "../Button/Button";
import { IoIosClose } from "react-icons/io";

interface PostModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const PostModal = ({ onClose, children }: PostModalProps) => {
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
        {children}
      </div>
    </div>
  );
};

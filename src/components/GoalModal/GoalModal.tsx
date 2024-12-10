import { ReactNode } from "react";

import styles from "./GoalModal.module.scss";
import { Button } from "../Button/Button";
import { IoIosClose } from "react-icons/io";

interface GoalModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const GoalModal = ({ onClose, children }: GoalModalProps) => {
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
        <h2 className={styles.header}>Goal</h2>
        {children}
      </div>
    </div>
  );
};

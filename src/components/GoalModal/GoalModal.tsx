import styles from "./GoalModal.module.scss";
import { Button } from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { GoalForm } from "../GoalForm.tsx/GoalForm";

interface GoalModalProps {
  onClose: () => void;
  currentGoal: number;
  handleSubmitGoal: (newGoal: number) => void;
}

export const GoalModal = ({
  onClose,
  currentGoal,
  handleSubmitGoal,
}: GoalModalProps) => {
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
        <GoalForm
          currentGoal={currentGoal}
          handleSubmitGoal={handleSubmitGoal}
        />
      </div>
    </div>
  );
};

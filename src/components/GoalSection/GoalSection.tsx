import { IGoalData } from "../../models/IGoalData";
import { Button } from "../Button/Button";
import { Progress } from "../Progress/Progress";
import { Spinner } from "../Spinner/Spinner";
import styles from "./GoalSection.module.scss";

interface GoalSectionProps {
  goalData: IGoalData;
  loading: boolean;
  closeGoalModal: () => void;
  resetPostEditing: () => void;
}

export const GoalSection = ({
  goalData,
  loading,
  closeGoalModal,
  resetPostEditing,
}: GoalSectionProps) => {
  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.goal}>
      <Progress goal={goalData.weekly_goal} progress={goalData.goal_progress} />

      <div className={styles.buttons}>
        <Button type="button" size="default" onClick={closeGoalModal}>
          Set Goal
        </Button>

        {goalData.weekly_goal !== 0 && (
          <Button type="button" size="default" onClick={resetPostEditing}>
            + Create Post
          </Button>
        )}
      </div>
    </div>
  );
};

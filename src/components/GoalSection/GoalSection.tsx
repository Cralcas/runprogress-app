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
  return (
    <div className={styles.goal}>
      {loading ? (
        <Spinner />
      ) : (
        <Progress goal={goalData.goal} progress={goalData.progress} />
      )}

      <div className={styles.buttons}>
        <Button type="button" size="default" onClick={closeGoalModal}>
          Set Goal
        </Button>

        {goalData.goal !== 0 && (
          <Button type="button" size="default" onClick={resetPostEditing}>
            + Create Post
          </Button>
        )}
      </div>
    </div>
  );
};

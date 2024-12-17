import { FormEvent, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./GoalForm.module.scss";

interface GoalFormProps {
  currentGoal: number;
  handleSubmitGoal: (newGoal: number) => void;
}
export const GoalForm = ({ handleSubmitGoal, currentGoal }: GoalFormProps) => {
  const [goalInput, setLocalGoal] = useState(currentGoal);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitGoal(goalInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.goalDetails}>
          <div className={styles.input}>
            <label htmlFor="goal">Distance (in Km)</label>
            <input
              className={styles.field}
              type="number"
              id="goal"
              max={999}
              min={1}
              value={goalInput || ""}
              onChange={(e) => {
                setLocalGoal(Number(e.target.value));
              }}
              required
            />
          </div>
        </div>

        <Button type="submit" className={styles.goalButton}>
          Set Goal
        </Button>
      </form>
    </>
  );
};

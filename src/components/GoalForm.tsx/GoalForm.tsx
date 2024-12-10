import { FormEvent, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./GoalForm.module.scss";

interface GoalFormProps {
  currentGoal: number;
  onSetGoal: (newGoal: number) => void;
}
export const GoalForm = ({ onSetGoal, currentGoal }: GoalFormProps) => {
  const [localGoal, setLocalGoal] = useState(currentGoal);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (localGoal <= 0) {
      alert("Please enter a valid goal.");
      return;
    }

    onSetGoal(localGoal);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setLocalGoal(value ? parseFloat(value) : 0);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.goalDetails}>
          <div className={styles.input}>
            <label htmlFor="goal">Distance</label>
            <input
              className={styles.field}
              type="number"
              id="goal"
              max="999"
              value={localGoal || ""}
              onChange={handleGoalChange}
              required
            />
          </div>
          <span className={styles.unit}>Km</span>
        </div>
        <Button type="submit" className={styles.goalButton}>
          Set Goal
        </Button>
      </form>
    </>
  );
};

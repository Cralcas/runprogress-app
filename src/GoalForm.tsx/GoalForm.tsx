import { FormEvent, useState } from "react";
import { Button } from "../components/Button/Button";

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="goal">Enter Goal</label>
          <input
            type="number"
            id="goal"
            max="999"
            value={localGoal || ""}
            onChange={handleGoalChange}
            required
          />
          <span>/Km</span>
        </div>
        <Button type="submit">Set Goal</Button>
      </form>
    </>
  );
};

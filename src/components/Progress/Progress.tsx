import styles from "./Progress.module.scss";

interface IProgressProps {
  goal: number;
  progress: number;
}

export const Progress = ({ goal, progress }: IProgressProps) => {
  return (
    <>
      {goal ? (
        <div className={styles.container}>
          <h3 className={styles.header}>Goal for the week</h3>
          <div className={styles.progressContent}>
            <label htmlFor="progress" className={styles.unit}>
              {progress}/{goal}km
            </label>
            <progress
              id="progress"
              value={progress}
              max={goal}
              className={styles.progress}
            ></progress>
          </div>
        </div>
      ) : (
        <h3 className={styles.header}>Set a distance goal for this week</h3>
      )}
    </>
  );
};

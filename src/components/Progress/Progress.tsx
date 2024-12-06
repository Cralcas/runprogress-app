interface IProgressProps {
  goal: number;
  progress: number;
}

export const Progress = ({ goal, progress }: IProgressProps) => {
  return (
    <div>
      {!goal ? (
        <p>Set a goal for the week!</p>
      ) : (
        <div>
          <progress value={progress} max={goal}></progress>
          <span>
            {progress}/{goal}km
          </span>
        </div>
      )}
    </div>
  );
};

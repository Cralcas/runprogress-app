export function updateGoalProgress(prevProgress: number, change: number) {
  return Math.max(prevProgress + change, 0);
}

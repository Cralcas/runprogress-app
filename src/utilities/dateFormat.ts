export const getWeekStartDate = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now.setDate(now.getDate() - daysSinceMonday));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
};

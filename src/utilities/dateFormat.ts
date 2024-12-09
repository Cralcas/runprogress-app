export function getWeekStartDate() {
  const now = new Date();

  const dayOfWeek = now.getDay();

  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  now.setDate(now.getDate() - daysToSubtract);

  now.setHours(0, 0, 0, 0);

  return now.toISOString();
}

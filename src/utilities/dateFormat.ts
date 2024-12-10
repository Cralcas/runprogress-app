// export function getWeekStartDate() {
//   const now = new Date();

//   const dayOfWeek = now.getDay();

//   const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

//   now.setDate(now.getDate() - daysToSubtract);

//   now.setHours(0, 0, 0, 0);

//   return now.toISOString();
// }

export function getWeekInterval(): { start: string; end: string } {
  const now = new Date();

  // Find the start of the week
  const dayOfWeek = now.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - daysToSubtract);
  weekStart.setHours(0, 0, 0, 0);

  // Find the end of the week (6 days after the start)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return {
    start: weekStart.toISOString(),
    end: weekEnd.toISOString(),
  };
}

// const { start, end } = getWeekInterval(); // Get this week's start and end dates
// const { data: posts, error } = await supabase
//   .from("posts")
//   .select("*")
//   .gte("created_at", start)
//   .lte("created_at", end);

// if (error) {
//   console.error("Error fetching posts:", error);
// } else {
//   console.log("Posts for the week:", posts);
// }

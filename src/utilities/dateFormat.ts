export function getWeekStartDate() {
  const now = new Date();

  const dayOfWeek = now.getDay();

  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  now.setDate(now.getDate() - daysToSubtract);

  now.setHours(0, 0, 0, 0);

  return now.toISOString();
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

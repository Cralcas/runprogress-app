export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map((value) => value.trim());

  const parsedHours = parseInt(hours || "0", 10);
  const parsedMinutes = parseInt(minutes || "0", 10);

  if (parsedHours > 0 && parsedMinutes > 0) {
    return `${parsedHours}h ${parsedMinutes}min`;
  } else if (parsedHours > 0) {
    return `${parsedHours} h`;
  } else if (parsedMinutes > 0) {
    return `${parsedMinutes} min`;
  } else {
    return "";
  }
}

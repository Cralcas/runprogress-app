export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map((value) => value.trim());

  const parsedHours = parseInt(hours || "0", 10);
  const parsedMinutes = parseInt(minutes || "0", 10);

  if (parsedHours > 0 && parsedMinutes > 0) {
    return `${parsedHours} hour${
      parsedHours > 1 ? "s" : ""
    } ${parsedMinutes} min`;
  } else if (parsedHours > 0) {
    return `${parsedHours} hour${parsedHours > 1 ? "s" : ""}`;
  } else if (parsedMinutes > 0) {
    return `${parsedMinutes} min`;
  } else {
    return "0 min";
  }
}

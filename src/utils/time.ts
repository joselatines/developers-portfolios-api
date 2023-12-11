export function addHoursToCurrentTime(hours: number): Date {
  const now = new Date();
  const newDate = new Date(now.getTime() + hours * 60 * 60 * 1000);

  return newDate;
}

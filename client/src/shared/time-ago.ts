/**
 * Calculates the time difference between the current date and the provided date,
 * and returns a human-readable string representing how long ago the date was.
 *
 * @param {string} date - The date string we want to calculate the time difference for.
 * @returns {string} A string representing how long ago the date was, in seconds, minutes, hours, days, weeks, or years.
 */
export const timeAgo = (date: string): string => {
  const now = new Date();
  const inputDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInWeek = 7 * secondsInDay;
  const secondsInYear = 365 * secondsInDay;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hours ago`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} days ago`;
  } else if (diffInSeconds < secondsInYear) {
    const weeks = Math.floor(diffInSeconds / secondsInWeek);
    return `${weeks} weeks ago`;
  } else {
    const years = Math.floor(diffInSeconds / secondsInYear);
    return `${years} years ago`;
  }
};

import { toDateString } from "@/utils/dateHelpers";

// Today, or the following Monday on a weekend, as "YYYY-MM-DD".
// Weekends have no available employees, so starting there would show an empty list.
export const getNextWorkingDay = () => {
  const result = new Date();
  while (result.getDay() === 0 || result.getDay() === 6) {
    result.setDate(result.getDate() + 1);
  }
  return toDateString(result);
};

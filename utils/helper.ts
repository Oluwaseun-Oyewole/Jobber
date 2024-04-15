import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from "date-fns";

export const truncate = (str: string, n: number): string => {
  if (str?.length <= n) {
    return str;
  }
  return str?.slice(0, n) + "...";
};

export const getDateDifference = (
  dateString: string,
): {
  days: number;
  hours: number;
  minutes: number;
} => {
  const currentDate = new Date();
  const dateToCompare = dateString && parseISO(dateString);
  const days = differenceInDays(currentDate, dateToCompare);
  const hours = differenceInHours(currentDate, dateToCompare);
  const minutes = differenceInMinutes(currentDate, dateToCompare);

  return {
    days,
    hours,
    minutes,
  };
};

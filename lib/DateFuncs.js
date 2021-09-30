import { addMonths, eachMonthOfInterval, format } from "date-fns";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const arrayOfDates = eachMonthOfInterval({
  start: addMonths(new Date(), 1),
  end: addMonths(new Date(), 6),
});

export const months = arrayOfDates?.map((month) => {
  return {
    month: format(month, "LLLL"),
  };
});

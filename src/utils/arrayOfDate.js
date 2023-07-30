import dayjs from "dayjs";
import locale from "dayjs/locale/pl";
dayjs.locale({
  ...locale,
});
/**
 *
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @returns [] arryOfDate
 */
const dayjs_pl = dayjs().locale("pl");

export const generateDate = (
  month = dayjs_pl.month(),
  year = dayjs_pl.year()
) => {
  const firstDateOfMonth = dayjs_pl.year(year).month(month).startOf("month");

  const lastDateOfMonth = dayjs_pl.year(year).month(month).endOf("month");

  const arrayOfDate = [];

  //!  days in last month
  for (let i = 1; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({
      addE: true,
      isCurrentMonth: false,
      date: firstDateOfMonth.day(i),
    });
  }

  //! days in the current month
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      addE: true,
      isCurrentMonth: true,
      date: firstDateOfMonth.date(i),
      isToday:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs_pl.toDate().toDateString(),
    });
  }

  //!days to the end of the calendar
  const remainingDays = 42 - arrayOfDate.length;

  //last day of the month 6 = 30 => lastDateOfTheMonth(31) = 1 of july
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remainingDays;
    i++
  ) {
    arrayOfDate.push({
      addE: true,
      isCurrentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }

  return arrayOfDate;
};

export function compareTwoDates(first, second) {
  if (first & second)
    return (
      first.date() === second.date() &&
      first.month() === second.month() &&
      first.year() === second.year()
    );
}

export function compareTwoDatesInWeek(first, second) {
  // must compare timestart for first (Event) and date position on the calendar
  if (first & second)
    return (
      first.date() === second.date() &&
      first.month() === second.month() &&
      first.year() === second.year() &&
      first.hour() === second.hour()
    );
}

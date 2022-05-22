import moment from "moment";
import { memoize } from "lodash";
import { IDate } from "@/Enums/Core";
import { IMonth } from "@/Enums/Calendar";

export const getMonthsByYear = (year: number): IMonth[] => {
  //TODO уйти от moment
  const months: IMonth[] = [];
  for (let i = 1; i <= 12; i++) {
    const month = moment(`${i}/1/${year}`, "MM/D/YYYY");
    const previousMonth = i > 1 ? i - 1 : 12;
    const previousYear = i > 1 ? year : year - 1;
    const secondaryDayNum = moment(
      `${previousMonth}/${previousYear}`,
      "MM/YYYY"
    ).daysInMonth();
    months.push({
      num: i,
      name: month.format("MMMM YYYY"),
      dayNum: month.daysInMonth(),
      dayOfWeekStart: +month.format("e"),
      secondaryDayNum,
      year,
    });
  }
  return months;
};

export const convertDateStringToObject = memoize<
  (date: string | undefined) => IDate | null
>((dateString: string | undefined) => {
  if (!dateString) return null;
  const date = new Date(dateString);

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
});

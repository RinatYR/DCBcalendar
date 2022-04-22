import React, { useState } from "react";
import style from "./Calendar.less";
import moment from "moment";
import { Month } from "./Month";

interface ICalendarProps {
  year: number;
  selectedMonth: number;
  selectedDay: number;
  highlightDayStart: number;
  highlightDayEnd: number;
}

interface IMonth {
  num: number;
  name: string;
  dayNum: number;
  dayOfWeekStart: number;
  secondaryDayNum: number;
}

export const Calendar: React.FC<ICalendarProps> = ({
  year,
  selectedMonth,
  ...selectedInfo
}) => {
  moment.locale("ru");
  const [leftMonth, setLeftMonth] = useState<number>(selectedMonth);

  const monthList = React.useMemo(() => {
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
      });
    }
    return months;
  }, [year]);

  return (
    <div className={style.calendar}>
      <div onClick={() => setLeftMonth((prev) => (prev > 1 ? prev - 1 : prev))}>
        <img src="./static/icons/left.svg" height={12} />
      </div>
      <div className={style.calendarTrack}>
        <div
          className={style.calendarBody}
          style={{ transform: `translate(${(leftMonth - 1) * -314}px)` }}
        >
          {monthList.map(({ num, secondaryDayNum, ...monthProps }) => {
            const selectedProps = selectedMonth === num ? selectedInfo : {};
            return (
              <Month
                key={num}
                {...monthProps}
                {...selectedProps}
                secondaryDayNum={
                  leftMonth === num ? secondaryDayNum : undefined
                }
              />
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setLeftMonth((prev) => (prev < 11 ? prev + 1 : prev))}
      >
        <img src="./static/icons/right.svg" height={12} />
      </div>
    </div>
  );
};

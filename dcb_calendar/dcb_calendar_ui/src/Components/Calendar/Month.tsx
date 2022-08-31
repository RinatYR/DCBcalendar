import React from "react";
import style from "./Month.less";
import { useAppDispatch, useAppSelector } from "@/ReduxTools/hooks";
import { setSelectedDate } from "@/ReduxTools/appSlice";
import { IDay } from "./CalendarModels";

/**
 * Month props
 */
interface IMonthProps {
  name: string;
  month: number;
  year: number;
  monthName: string;
  dayNum: number;
  dayOfWeekStart: number;
  daysInPreviousMonth: number;
  selectedDay?: number;
}

/**
 * Month component
 */
export const Month: React.FC<IMonthProps> = React.memo(
  ({ name, month, year, monthName, dayNum, dayOfWeekStart, daysInPreviousMonth, selectedDay }) => {
    /** Dispatch from redux */
    const appDispatch = useAppDispatch();
    /** Calendar info state */
    const calendarInfo = useAppSelector((state) => state.calendar.calendarInfo);

    const handleDateChange = (dayName) => () => {
      appDispatch(setSelectedDate(dayName));
    };
    const renderWeekName = () => (
      <div className={`${style.monthBody} ${style.monthDayOfWeek}`}>
        <span className={style.monthDay}>пн</span>
        <span className={style.monthDay}>вт</span>
        <span className={style.monthDay}>ср</span>
        <span className={style.monthDay}>чт</span>
        <span className={style.monthDay}>пт</span>
        <span className={style.monthDay}>сб</span>
        <span className={style.monthDay}>вс</span>
      </div>
    );

    const renderHeader = () => <div className={style.monthHeader}>{name}</div>;

    const renderDays = () => {
      /** Create month days  */
      const days: IDay[] = [];
      for (let i = 0; i < dayNum; i++) {
        const num = i + 1;
        let className = `${style.monthDay} ${selectedDay === num && style.monthDaySelected} ${
          calendarInfo?.[year]?.[month]?.[num] && style.monthDayWithEvents
        }`;
        days.push({ num, className, dayName: `${monthName}.${num}` });
      }

      /** Create days before month days  */
      const beforeDays: IDay[] = [];
      for (let i = dayOfWeekStart; i > 0; i--) {
        beforeDays.push({
          num: daysInPreviousMonth - i + 1,
          className: `${style.monthDay} ${style.monthDaySecondary}`,
        });
      }

      /** Create days after month days */
      const afterDays: IDay[] = [];
      const afterDaysNum = (7 - ((dayOfWeekStart + dayNum) % 7)) % 7;
      for (let num = 1; num <= afterDaysNum; num++) {
        afterDays.push({
          num,
          className: `${style.monthDay} ${style.monthDaySecondary}`,
        });
      }

      return [...beforeDays, ...days, ...afterDays];
    };

    return (
      <div className={style.month}>
        {renderHeader()}
        {renderWeekName()}
        <div className={style.monthBody}>
          {renderDays().map((day, idx) => (
            <div
              key={`${idx}-${day.num}`}
              className={day.className}
              onClick={handleDateChange(day.dayName)}
            >
              <span>{day.num}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

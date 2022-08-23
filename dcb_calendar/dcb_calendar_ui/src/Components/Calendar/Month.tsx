import React from "react";
import { useMemo } from "react";
import style from "./Month.less";

/**
 * Month props
 */
interface IMonthProps {
  name: string;
  dayNum: number;
  dayOfWeekStart: number;
  daysInPreviousMonth: number;
  selectedDay?: number;
}

/**
 * Day interface
 */
interface IDay {
  num: number;
  className: string;
}

/**
 * Month component
 */
export const Month: React.FC<IMonthProps> = React.memo(
  ({ name, dayNum, dayOfWeekStart, daysInPreviousMonth, selectedDay }) => {
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

    const days = useMemo<IDay[]>(() => {
      /** Create month days  */
      const days: IDay[] = [];
      for (let i = 0; i < dayNum; i++) {
        const num = i + 1;
        const className = `${style.monthDay} ${
          selectedDay === num && style.monthDaySelected
        }`;
        days.push({ num, className });
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
    }, [dayNum, dayOfWeekStart, daysInPreviousMonth, selectedDay]);

    return (
      <div className={style.month}>
        {renderHeader()}
        {renderWeekName()}
        <div className={style.monthBody}>
          {days.map((day, idx) => (
            <div key={`${idx}-${day.num}`} className={day.className}>
              <span>{day.num}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

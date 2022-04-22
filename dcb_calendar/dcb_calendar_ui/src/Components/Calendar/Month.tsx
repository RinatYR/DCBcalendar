import React from "react";
import style from "./Month.less";

interface IMonthProps {
  name: string;
  dayNum: number;
  dayOfWeekStart: number;
  highlightDayStart?: number;
  highlightDayEnd?: number;
  selectedDay?: number;
  secondaryDayNum?: number;
}

interface IDay {
  num?: number;
  className: string;
}

export const Month: React.FC<IMonthProps> = React.memo(
  ({
    name,
    dayNum,
    dayOfWeekStart,
    highlightDayStart,
    highlightDayEnd,
    selectedDay,
    secondaryDayNum,
  }) => {
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

    const getDays = (): IDay[] => {
      const days: IDay[] = [];
      const previousDays: IDay[] = [];
      const nextDays: IDay[] = [];

      for (let i = 0; i < dayNum; i++) {
        const num = i + 1;
        const highlight =
          highlightDayStart &&
          highlightDayEnd &&
          highlightDayStart <= num &&
          num <= highlightDayEnd;
        const className = `${style.monthDay} ${
          selectedDay === num && style.monthDaySelected
        } ${highlight && style.monthDayHighlight} ${
          highlightDayStart === num && style.monthDayHighlightFirst
        } ${highlightDayEnd === num && style.monthDayHighlightLast}`;
        days.push({ num, className });
      }
      for (let i = dayOfWeekStart; i > 0; i--) {
        const secondaryDay: IDay = {
          className: `${style.monthDay} ${style.monthDaySecondary}`,
        };
        if (secondaryDayNum) secondaryDay.num = secondaryDayNum - i + 1;
        previousDays.push(secondaryDay);
      }
      const nextDaysNum = (7 - ((dayOfWeekStart + dayNum) % 7)) % 7;
      for (let i = 1; i <= nextDaysNum; i++) {
        const secondaryDay: IDay = {
          className: `${style.monthDay} ${style.monthDaySecondary}`,
        };
        if (!secondaryDayNum) secondaryDay.num = i;
        nextDays.push(secondaryDay);
      }

      return [...previousDays, ...days, ...nextDays];
    };

    return (
      <div className={style.month}>
        {renderHeader()}
        {renderWeekName()}
        <div className={style.monthBody}>
          {getDays().map((day, idx) => (
            <div key={`${idx}-${day.num}`} className={day.className}>
              <span>{day.num}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

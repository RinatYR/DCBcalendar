import { useCalendarActions } from "@/Actions/CalendarAction";
import { getMonthsByYear } from "@/Core/utils";
import { IMonth } from "@/Enums/Calendar";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect, useMemo, useState } from "react";
import style from "./Calendar.less";
import { MonthList } from "./MonthList";

interface ICalendarProps {}

export const Calendar: React.FC<ICalendarProps> = () => {
  const [viewMonth, setViewMonth] = useState<number>(
    () => new Date().getMonth() + 1
  );
  const [year, setYear] = useState<number | number[]>(() =>
    new Date().getFullYear()
  );
  /** Filter state */
  const filter = useAppSelector((state) => state.filters.filter);
  /** Event list Actions */
  const { getCalendarInfo } = useCalendarActions();

  /** Get dates when filter changed */
  useEffect(() => {
    getCalendarInfo(filter);
  }, [filter]);

  const monthList = useMemo<IMonth[]>(() => {
    if (Array.isArray(year)) {
      const months: IMonth[] = [];
      const firstYear = year[0] as number;
      const lastYear = year[year.length - 1] as number;
      for (let i = firstYear; i <= lastYear; i++) {
        months.push(...getMonthsByYear(i));
      }
      return months;
    } else {
      return getMonthsByYear(year);
    }
  }, [year]);

  const handleMoveToLeft = (): void => {
    setViewMonth((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleMoveToRight = (): void => {
    setViewMonth((prev) => (prev < monthList.length ? prev + 1 : prev));
  };

  const transformStyleBody = useMemo(
    () => ({ transform: `translate(${(viewMonth - 1) * -314}px)` }),
    [viewMonth]
  );

  return (
    <div className={style.calendar}>
      <div onClick={handleMoveToLeft}>
        <img src="./static/img/left-arrow.svg" height={12} />
      </div>
      <div className={style.calendarTrack}>
        <div className={style.calendarBody} style={transformStyleBody}>
          <MonthList monthList={monthList} />
        </div>
      </div>
      <div onClick={handleMoveToRight}>
        <img src="./static/img/right-arrow.svg" height={12} />
      </div>
    </div>
  );
};

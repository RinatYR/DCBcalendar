import { convertDateStringToObject, getMonthsByYear } from "@/Core/utils";
import { IMonth } from "@/Enums/Calendar";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { useMemo, useState } from "react";
import style from "./Calendar.less";
import { ICalendarHighlightInfo, MonthList } from "./MonthList";

interface ICalendarProps {}

export const Calendar: React.FC<ICalendarProps> = () => {
  const [leftMonth, setLeftMonth] = useState<number>(() => new Date().getMonth() + 1);
  const [year, setYear] = useState<number | number[]>(() => new Date().getFullYear());
  const visibleDates = useAppSelector((state) => state.app.visibleDates);

  const calendarInfo: ICalendarHighlightInfo | null = useMemo(() => {
    const highlightDateStart = convertDateStringToObject(visibleDates[0]);
    const highlightDateEnd = convertDateStringToObject(visibleDates[visibleDates.length - 1]);
    if (!highlightDateStart || !highlightDateEnd) return null;

    setYear(
      highlightDateStart.year !== highlightDateEnd.year
        ? [highlightDateStart.year, highlightDateEnd.year]
        : highlightDateStart.year
    );

    return {
      highlightDateStart,
      highlightDateEnd,
    };
  }, [visibleDates]);

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
    setLeftMonth((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleMoveToRight = (): void => {
    setLeftMonth((prev) => (prev < monthList.length - 1 ? prev + 1 : prev));
  };

  const transformStyleBody = useMemo(
    () => ({ transform: `translate(${(leftMonth - 1) * -314}px)` }),
    [leftMonth]
  );

  return (
    <div className={style.calendar}>
      <div onClick={handleMoveToLeft}>
        <img src="./static/img/left-arrow.svg" height={12} />
      </div>
      <div className={style.calendarTrack}>
        <div className={style.calendarBody} style={transformStyleBody}>
          {calendarInfo ? (
            <MonthList highlightInfo={calendarInfo} monthList={monthList} leftMonth={leftMonth} />
          ) : (
            <div>Загрузка</div>
          )}
        </div>
      </div>
      <div onClick={handleMoveToRight}>
        <img src="./static/img/right-arrow.svg" height={12} />
      </div>
    </div>
  );
};

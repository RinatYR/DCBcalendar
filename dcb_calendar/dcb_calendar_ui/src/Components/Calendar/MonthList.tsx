import { convertDateStringToObject } from "@/Core/utils";
import { IMonth } from "@/Enums/Calendar";
import { IDate } from "@/Enums/Core";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { memo } from "react";
import { Month } from "./Month";

interface IMonthListProps {
  highlightInfo: ICalendarHighlightInfo;
  monthList: IMonth[];
  leftMonth: number;
}

export interface ICalendarHighlightInfo {
  highlightDateStart: IDate;
  highlightDateEnd: IDate;
}

export const MonthList = memo<IMonthListProps>(({ highlightInfo, monthList, leftMonth }) => {
  if (!highlightInfo) return null;

  const { highlightDateStart, highlightDateEnd } = highlightInfo;
  const selectedDate = useAppSelector((state) => convertDateStringToObject(state.app.selectedDate));

  return (
    <>
      {monthList.map(({ num, year, secondaryDayNum, ...monthProps }) => {
        const isHighlight =
          highlightDateStart.month <= num &&
          highlightDateEnd.month >= num &&
          highlightDateStart.year <= year &&
          highlightDateEnd.year >= year;
        const highlightDayProps = isHighlight
          ? {
              highlightDayStart: highlightDateStart.month === num ? highlightDateStart.day : 1,
              highlightDayEnd:
                highlightDateEnd.month === num ? highlightDateEnd.day : monthProps.dayNum,
            }
          : {};

        const isSelected = selectedDate && selectedDate.year === year && selectedDate.month === num;

        return (
          <Month
            key={`${num}${year}`}
            {...monthProps}
            {...highlightDayProps}
            selectedDay={isSelected ? selectedDate.day : undefined}
            secondaryDayNum={leftMonth === num ? secondaryDayNum : undefined}
          />
        );
      })}
    </>
  );
});

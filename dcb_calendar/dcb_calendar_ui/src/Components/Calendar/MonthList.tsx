import { convertDateStringToObject } from "@/Core/utils";
import { IMonth } from "@/Enums/Calendar";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { memo } from "react";
import { Month } from "./Month";

interface IMonthListProps {
  monthList: IMonth[];
}

export const MonthList = memo<IMonthListProps>(({ monthList }) => {
  const selectedDate = useAppSelector((state) =>
    convertDateStringToObject(state.app.selectedDate)
  );

  return (
    <>
      {monthList.map(({ num, year, secondaryDayNum, ...monthProps }) => {
        const isSelected =
          selectedDate &&
          selectedDate.year === year &&
          selectedDate.month === num;

        return (
          <Month
            key={`${num}${year}`}
            {...monthProps}
            selectedDay={isSelected ? selectedDate?.day : undefined}
            daysInPreviousMonth={secondaryDayNum}
          />
        );
      })}
    </>
  );
});

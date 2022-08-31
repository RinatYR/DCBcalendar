import { IMonth } from "@/Enums/Calendar";
import React, { memo } from "react";
import { Month } from "./Month";

interface IMonthListProps {
  monthList: IMonth[];
}

export const MonthList = memo<IMonthListProps>(({ monthList }) => {

  return (
    <>
      {monthList.map(({ num, year, secondaryDayNum, ...monthProps }) => (
          <Month
            key={`${num}${year}`}
            monthName={`${year}.${num}`}
            month={num}
            year={year}
            {...monthProps}
            daysInPreviousMonth={secondaryDayNum}
          />
        )
      )}
    </>
  );
});

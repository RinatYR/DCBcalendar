import { TCalendarInfo } from "@/Components/Calendar/CalendarModels";
import { IFilter } from "@/ReduxTools/filtersSlice";

export const getCalendarInfoService = async (filter: IFilter): Promise<TCalendarInfo> => {
  const calendarInfoData = await fetch("/rest/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter }),
  });
  //TODO добавить кнопку повторить и вывод ошибки
  if (calendarInfoData.status !== 200) return {};
  const calendarInfo: TCalendarInfo = await calendarInfoData.json();

  return calendarInfo;
};

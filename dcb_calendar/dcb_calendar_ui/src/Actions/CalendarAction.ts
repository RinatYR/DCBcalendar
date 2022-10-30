import { setCalendar } from "@/ReduxTools/calendarSlice";
import { IFilter } from "@/ReduxTools/filtersSlice";
import { useAppDispatch } from "@/ReduxTools/hooks";
import { getCalendarInfoService } from "@/Services/CalendarService";

interface ICalendarActions {
  getCalendarInfo: (filter: IFilter) => Promise<void>;
}

export const useCalendarActions = (): ICalendarActions => {
  const calendarDispatch = useAppDispatch();
  return {
    getCalendarInfo: (filter: IFilter) =>
      calendarDispatch(async (dispatch) => {
        const calendarInfo = await getCalendarInfoService(filter);
        dispatch(setCalendar(calendarInfo));
      }),
  };
};

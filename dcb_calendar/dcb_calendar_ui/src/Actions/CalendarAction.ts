import { setCalendar } from "@/ReduxTools/calendarSlice";
import { useAppDispatch } from "@/ReduxTools/hooks";
import { getCalendarInfoService } from "@/Services/CalendarService";

interface ICalendarActions {
  getCalendarInfo: (filter: number[]) => Promise<void>;
}

export const useCalendarActions = (): ICalendarActions => {
  const calendarDispatch = useAppDispatch();
  return {
    getCalendarInfo: (filter: number[]) =>
      calendarDispatch(async (dispatch) => {
        const calendarInfo = await getCalendarInfoService(filter);
        dispatch(setCalendar(calendarInfo));
      }),
  };
};

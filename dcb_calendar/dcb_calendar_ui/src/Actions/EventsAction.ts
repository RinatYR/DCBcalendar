import { setEvents } from "@/ReduxTools/eventsSlice";
import { useAppDispatch } from "@/ReduxTools/hooks";
import { getEventsListService } from "@/Services/EventsService";

interface IEventsActions {
  getEventsList: (filter: number[]) => Promise<void>;
}

export const useEventsActions = (): IEventsActions => {
  const eventsDispatch = useAppDispatch();
  return {
    getEventsList: (filter: number[]) =>
      eventsDispatch(async (dispatch) => {
        const eventsList = await getEventsListService(filter);
        dispatch(setEvents(eventsList));
      }),
  };
};

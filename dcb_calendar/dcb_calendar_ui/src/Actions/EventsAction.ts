import { setEvents } from "@/ReduxTools/eventsSlice";
import { IFilter } from "@/ReduxTools/filtersSlice";
import { useAppDispatch } from "@/ReduxTools/hooks";
import { getEventsListService } from "@/Services/EventsService";

interface IEventsActions {
  getEventsList: (filter: IFilter) => Promise<void>;
}

export const useEventsActions = (): IEventsActions => {
  const eventsDispatch = useAppDispatch();
  return {
    getEventsList: (filter: IFilter) =>
      eventsDispatch(async (dispatch) => {
        const eventsList = await getEventsListService(filter);
        dispatch(setEvents(eventsList));
      }),
  };
};

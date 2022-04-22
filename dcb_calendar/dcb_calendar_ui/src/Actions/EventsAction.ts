import { addNextEvents } from "@/ReduxTools/eventsSlice";
import { useAppDispatch } from "@/ReduxTools/hooks";
import { getEventsListService } from "@/Services/EventsService";

interface IEventsActions {
    getEventsList: () => Promise<void>;
}

export const useEventsActions = (): IEventsActions => {
  const eventsDispatch = useAppDispatch();
  return {
    getEventsList: () =>
      eventsDispatch(async (dispatch) => {
        const eventsList = await getEventsListService();
        dispatch(addNextEvents(eventsList));
      }),
  };
};

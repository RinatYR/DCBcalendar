import { IEvent } from "@/Components/Events/EventsModels";
import { IFilter } from "@/ReduxTools/filtersSlice";

export const getEventsListService = async (filter: IFilter): Promise<IEvent[]> => {
  const eventsData = await fetch("/rest/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter }),
  });
  //TODO добавить кнопку повторить и вывод ошибки
  if (eventsData.status !== 200) return [];
  const eventsList: IEvent[] = await eventsData.json();

  return eventsList;
};

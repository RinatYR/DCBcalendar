export const getEventsListService = async () => {
  const eventsData = await fetch("/rest/events");
  const eventsList = await eventsData.json();

  return eventsList;
};

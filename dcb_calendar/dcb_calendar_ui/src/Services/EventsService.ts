export const getEventsListService = async (filter: number[]) => {
  const eventsData = await fetch("/rest/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ filter }),
  });
  //TODO добавить кнопку повторить и вывод ошибки
  if(eventsData.status !== 200) return [];
  const eventsList = await eventsData.json();

  return eventsList;
};

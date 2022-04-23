import { useEventsActions } from "@/Actions/EventsAction";
import { EEventStatus } from "@/Enums/Events";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect } from "react";
import { EventsItem } from "./EventsItem";
import style from "./EventsList.less";
import { IEventDate } from "./EventsModels";

export const EventsList: React.FC = React.memo(() => {
  const eventsList = useAppSelector((state) => state.events.eventsList);
  const { getEventsList } = useEventsActions();

  useEffect(() => {
    getEventsList();
  }, []);

  return (
    <div className={style.eventList}>
      {eventsList.map(({ date, id, ...event }) => {
        const parseDate = new Date(date);
        const status = EEventStatus.EXPIRED;

        const day = parseDate.getDate().toString();
        const month = parseDate.toLocaleDateString("ru-RU", { month: "long" });
        const dayWeek = parseDate.toLocaleDateString("ru-RU", {
          weekday: "long",
        });
        const eventDate: IEventDate = { day, month, dayWeek };

        return (
          <EventsItem {...event} date={eventDate} status={status} key={id} />
        );
      })}
    </div>
  );
});

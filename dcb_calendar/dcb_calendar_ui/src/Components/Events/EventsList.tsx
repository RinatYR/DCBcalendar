import { useEventsActions } from "@/Actions/EventsAction";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect } from "react";
import style from "./EventsList.less";

export const EventsList: React.FC = React.memo(() => {
  const eventsList = useAppSelector((state) => state.events.eventsList);
  const { getEventsList } = useEventsActions();

  useEffect(() => {
    getEventsList();
  }, []);
  console.log(eventsList);
  return <div className={style.event}>Hello</div>;
});

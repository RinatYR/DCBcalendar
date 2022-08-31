import { useEventsActions } from "@/Actions/EventsAction";
import { usePrevState } from "@/Core/hooks";
import { EEventStatus } from "@/Enums/Events";
import { useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect, useRef, useState } from "react";
import { EventsItem } from "./EventsItem";
import style from "./EventsList.less";
import { IEventDate } from "./EventsModels";

const monthList = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

/**
 * Event list component
 */
export const EventsList: React.FC = () => {
  /** Event list state */
  const eventsList = useAppSelector((state) => state.events.eventsList);
  /** Filter state */
  const filter = useAppSelector((state) => state.filters.filter);
  /** Selected date state */
  const selectedDate = useAppSelector((state) => state.app.selectedDate);
  /** Use previous state for selectedDate */
  const prevSelectedDate = usePrevState(selectedDate);
  /** Event list Actions */
  const { getEventsList } = useEventsActions();
  /** Highlight event state */
  const [activeEvent, setActiveEvent] = useState<number>();
  /** Download flag */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** No events flag */
  const [isNoEventsMore, setIsNoEventsMore] = useState<boolean>(false);
  /** Ref for scroll container */
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /** Get events when filter changed */
  useEffect(() => {
    setIsLoading(true);
    getEventsList(filter).then(
      () => {
        setIsLoading(false);
      },
      () => setIsNoEventsMore(true)
    );
  }, [filter]);

  /** Scroll to event when selected day changed */
  useEffect(() => {
    if (selectedDate !== prevSelectedDate) {
      eventsList.some((event) => {
        const parseDate = new Date(event.date);
        const stringDate = `${parseDate.getFullYear()}.${
          parseDate.getMonth() + 1
        }.${parseDate.getDate()}`;
        if (selectedDate === stringDate) {
          setActiveEvent(event.id);
          return true;
        }
        return false;
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [activeEvent]);

  const renderList = () => {
    let isExpected = false;
    const weekFormater = Intl.DateTimeFormat("ru-RU", { weekday: "long" });
    const monthNameFormater = Intl.DateTimeFormat("ru-RU", { month: "long" });
    const eventsByMonth: Record<string, JSX.Element[]> = {};
    eventsList.forEach(({ date, id, category, ...event }) => {
      const parseDate = new Date(date);

      let status = isExpected ? EEventStatus.EXPECTED : EEventStatus.EXPIRED;
      if (!isExpected && Date.now() <= +parseDate) {
        isExpected = true;
        status = activeEvent ? EEventStatus.EXPECTED : EEventStatus.ACTIVE;
        !activeEvent && setActiveEvent(id);
      }
      status = activeEvent === id ? EEventStatus.ACTIVE : status;

      const day = parseDate.getDate();
      const month = monthList[parseDate.getMonth()] || "";
      const monthName = monthNameFormater.format(parseDate) + parseDate.getFullYear();
      const dayWeek = weekFormater.format(parseDate);
      const eventDate: IEventDate = {
        day: day.toString(),
        month: month,
        dayWeek,
      };

      const observeTime = parseDate.toISOString();

      if (!Array.isArray(eventsByMonth[monthName])) eventsByMonth[monthName] = [];
      eventsByMonth[monthName]?.push(
        <div key={"eventWrap" + id}>
          {status === EEventStatus.ACTIVE && (
            <div className={style.eventScroller} key="eventScroller" ref={scrollRef}></div>
          )}
          <EventsItem
            {...event}
            date={eventDate}
            status={status}
            key={"event" + id}
            color={category[0]?.color}
            observeTime={observeTime}
            setRef={() => {}}
          />
        </div>
      );
    });

    return Object.keys(eventsByMonth).map((monthName) => (
      <div key={monthName}>
        <div className={style.monthName}>{monthName.replace(/\d/g, "")}</div>
        {eventsByMonth[monthName]}
      </div>
    ));
  };

  return (
    <div className={style.eventListWrap}>
      <div className={style.eventList} ref={scrollRef}>
        {renderList()}
        <div className={style.eventListGetMore}>
          {isLoading && <div className={style.eventListLoader}>Загрузка</div>}
          {isNoEventsMore && <div className={style.eventListEmpty}>Событий больше нет</div>}
        </div>
      </div>
    </div>
  );
};

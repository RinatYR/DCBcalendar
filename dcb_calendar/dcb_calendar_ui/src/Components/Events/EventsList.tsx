import { useEventsActions } from "@/Actions/EventsAction";
import { EEventStatus } from "@/Enums/Events";
import { setSelectedDate, setVisibleDates } from "@/ReduxTools/appSlice";
import { useAppDispatch, useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect, useRef, useState } from "react";
import { EventsItem } from "./EventsItem";
import style from "./EventsList.less";
import { IEventDate } from "./EventsModels";
import { debounce } from "lodash";

export const EventsList: React.FC = React.memo(() => {
  const eventsList = useAppSelector((state) => state.events.eventsList);
  const filter = useAppSelector((state) => state.filters.filter);
  const appDispatch = useAppDispatch();
  const { getEventsList } = useEventsActions();
  const [activeEvent, setActiveEvent] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNoEventsMore, setIsNoEventsMore] = useState<boolean>(false);
  const scrollRef = useRef(null);
  const observer = useRef<IntersectionObserver>();
  const visibleDatesRef = useRef<Record<string, number>>();
  const observerFirstCall = useRef<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getEventsList(filter).then(
      () => {
        setIsLoading(false);
      },
      () => setIsNoEventsMore(true)
    );
  }, [filter]);

  const handleClickEvent = (id: number, date: string) => (): void => {
    appDispatch(setSelectedDate(date));
    setActiveEvent(id);
  };

  const updateVisibleDates = debounce((newVisibleDates: string[]) => {
    appDispatch(setVisibleDates(newVisibleDates));
  }, 300);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    const newVisibleDates = { ...visibleDatesRef.current };
    entries?.length &&
      entries.forEach((elem) => {
        const date = elem.target.attributes["data-date"].value;
        let dateAmount = newVisibleDates[date] || 0;
        if (observerFirstCall.current) {
          dateAmount = elem.isIntersecting ? dateAmount + 1 : dateAmount;
        } else {
          dateAmount = elem.isIntersecting ? dateAmount + 1 : dateAmount - 1;
        }
        newVisibleDates[date] = dateAmount;
        if (dateAmount <= 0) delete newVisibleDates[date];
      });
    observerFirstCall.current = false;
    visibleDatesRef.current = newVisibleDates;

    updateVisibleDates(Object.keys(newVisibleDates).sort());
  };

  const getObserver = (): IntersectionObserver => {
    const options = {
      root: scrollRef.current,
      rootMargin: "0px",
      threshold: 0,
    };

    return new IntersectionObserver(observerCallback, options);
  };

  const setObserve = (elem: HTMLElement | null) => {
    elem && observer.current?.observe(elem);
  };

  const renderList = () => {
    let isExpected = false;
    if (!observer.current) observer.current = getObserver();
    const weekFormater = Intl.DateTimeFormat("ru-RU", { weekday: "short" });

    return eventsList.map(({ date, id, ...event }) => {
      const parseDate = new Date(date);

      let status = isExpected ? EEventStatus.EXPECTED : EEventStatus.EXPIRED;
      if (!isExpected && Date.now() <= +parseDate) {
        isExpected = true;
        status = activeEvent ? EEventStatus.EXPECTED : EEventStatus.ACTIVE;
      }
      status = activeEvent === id ? EEventStatus.ACTIVE : status;

      const day = parseDate.getDate();
      const month = parseDate.getMonth() + 1;
      const dayWeek = weekFormater.format(parseDate);
      const eventDate: IEventDate = {
        day: day < 10 ? "0" + day : day.toString(),
        month: month < 10 ? "0" + month : month.toString(),
        dayWeek,
      };

      const observeTime = parseDate.toISOString();

      return (
        <EventsItem
          {...event}
          date={eventDate}
          status={status}
          key={"event" + id}
          onClick={handleClickEvent(id, parseDate.toDateString())}
          observeTime={observeTime}
          setObserve={setObserve}
        />
      );
    });
  };

  return (
    <div className={style.eventListWrap}>
      <div className={style.eventList} ref={scrollRef.current}>
        {renderList()}
        <div className={style.eventListGetMore}>
          {isLoading && <div className={style.eventListLoader}>Загрузка</div>}
          {isNoEventsMore && (
            <div className={style.eventListEmpty}>Событий больше нет</div>
          )}
        </div>
      </div>
    </div>
  );
});

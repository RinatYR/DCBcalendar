import { EEventStatus } from "@/Enums/Events";
import React, { useEffect, useRef } from "react";
import style from "./EventsItem.less";
import { IEvent, IEventDate } from "./EventsModels";

interface IEventsItemProps extends Omit<IEvent, "date" | "id" | "category" | "created_at"> {
  date: IEventDate;
  status: EEventStatus;
  isSelected: boolean;
  color: string | undefined;
  setRef: (ref: HTMLDivElement | null) => void;
  isNew: boolean;
}

export const EventsItem: React.FC<IEventsItemProps> = ({
  date,
  status,
  title,
  description,
  links,
  link,
  place,
  format,
  color,
  setRef,
  isSelected,
  isNew,
}) => {
  /** Ref for scrolling */
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isSelected && setRef(scrollRef.current);
  }, [status]);

  const renderDate = () => (
    <div className={style.eventDate} key="eventDate">
      <div className={style.eventDay}>
        {date.day} {date.month}
      </div>
      <div className={style.eventDayWeek}>{date.dayWeek}</div>
      {isNew && <div className={style.eventLabelNew}>Новое</div>}
    </div>
  );

  return (
    <div
      className={`${style.event} ${isSelected && style.eventActive}  ${
        status === EEventStatus.EXPIRED && style.eventExpired
      }`}
      // onClick={() => link && window.open(link)}
      // style={{ cursor: link ? "pointer" : "default" }}
      ref={scrollRef}
    >
      <div
        className={style.eventLine}
        style={{ background: color ? "#" + color : "#33bbaf" }}
        key="eventLine"
      />
      {renderDate()}
      <div className={style.eventBody} key="eventBody">
        <p className={style.eventDescription}>
          {place} • {format}
        </p>
        <h3 className={style.eventTitle}>{title}</h3>
        <p className={style.eventDescription}>{description}</p>
        <div className={style.eventActions}>
          {links?.map((link) => (
            <a
              className={style.eventAction}
              onClick={(e) => e.stopPropagation()}
              href={link.link}
              key={link.id}
              target="_blank"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>

      <div className={style.eventLinkWrap} key="eventLink">
        {link && (
          <a className={style.eventLink} href={link} target="_blank">
            <span>{link.replace(/^http.?:\/\/(.*)\/.*/gm, '$1')}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 2.75C3.30964 2.75 2.75 3.30964 2.75 4V14C2.75 14.6904 3.30964 15.25 4 15.25H14C14.6904 15.25 15.25 14.6904 15.25 14V13.375C15.25 12.6846 15.8096 12.125 16.5 12.125C17.1904 12.125 17.75 12.6846 17.75 13.375V14C17.75 16.0711 16.0711 17.75 14 17.75H4C1.92893 17.75 0.25 16.0711 0.25 14V4C0.25 1.92893 1.92893 0.25 4 0.25H4.625C5.31536 0.25 5.875 0.809644 5.875 1.5C5.875 2.19036 5.31536 2.75 4.625 2.75H4Z"
                fill="#B2B8BF"
              />
              <path
                d="M8.375 1.5C8.375 0.809644 8.93464 0.25 9.625 0.25H15.25C16.6307 0.25 17.75 1.36929 17.75 2.75V8.375C17.75 9.06536 17.1904 9.625 16.5 9.625C15.8096 9.625 15.25 9.06536 15.25 8.375V4.51777L9.25888 10.5089C8.77073 10.997 7.97927 10.997 7.49112 10.5089C7.00296 10.0207 7.00296 9.22927 7.49112 8.74112L13.4822 2.75H9.625C8.93464 2.75 8.375 2.19036 8.375 1.5Z"
                fill="#B2B8BF"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

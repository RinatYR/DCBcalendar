import { EEventStatus } from "@/Enums/Events";
import React from "react";
import style from "./EventsItem.less";
import { IEvent, IEventDate } from "./EventsModels";

interface IEventsItemProps extends Omit<IEvent, "date" | "id"> {
  date: IEventDate;
  status: EEventStatus;
  onClick(): void;
  setObserve(elem: Element | null): void;
  observeTime: string;
}

export const EventsItem: React.FC<IEventsItemProps> = ({
  date,
  photo,
  status,
  attachments,
  title,
  description,
  action_link,
  action_text,
  onClick,
  setObserve,
  observeTime,
}) => {
  const renderDate = () => (
    <div className={style.eventDate}>
      <div className={style.eventDay}>{date.day}</div>
      <div>
        <div className={style.eventDayWeek}>{date.dayWeek}</div>
        <div className={style.eventMonth}>{date.month}</div>
      </div>
    </div>
  );

  const renderAttachments = () => (
    <div className={style.eventAttachments}>
      {photo && (
        <img
          className={`${style.eventPhoto} ${
            status === EEventStatus.EXPIRED && style.eventPhotoExpired
          }`}
          src={photo}
        />
      )}
      {attachments?.map((attachment) => (
        <a className={style.eventAttachmentLink} href={attachment.link}>
          <img className={style.eventAttachmentImg} src={attachment.image} />
        </a>
      ))}
    </div>
  );

  return (
    <div
      className={`${style.event} ${status === EEventStatus.ACTIVE && style.eventActive}  ${
        status === EEventStatus.EXPECTED && style.eventExpected
      }`}
      onClick={onClick}
      ref={setObserve}
      data-date={observeTime}
    >
      {renderDate()}
      {renderAttachments()}
      <div className={style.eventBody}>
        <p className={style.eventDescription}>{description}</p>
        <h3 className={style.eventTitle}>{title}</h3>
        {action_link && action_text && (
          <a
            className={`${style.eventAction} ${
              status === EEventStatus.EXPIRED && style.eventActionDisabled
            }`}
            href={action_link}
          >
            {action_text}
          </a>
        )}
      </div>
    </div>
  );
};

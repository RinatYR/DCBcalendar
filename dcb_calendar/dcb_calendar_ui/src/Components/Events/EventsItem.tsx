import { EEventStatus } from "@/Enums/Events";
import React from "react";
import style from "./EventsItem.less";
import { IEvent, IEventDate } from "./EventsModels";

interface IEventsItemProps extends Omit<IEvent, 'dateYear'>{
  date: IEventDate;
  status: EEventStatus;
}

export const EventsItem: React.FC<IEventsItemProps> = React.memo(
  ({ date, photos, status, attachments, title, description, action }) => {
    const renderDate = () => (
      <div className={style.eventDate}>
        <div className={style.eventDay}>{date.day}</div>
        <div>
          <div className={style.eventMonth}>{date.month}</div>
          <div className={style.eventDayWeek}>{date.dayWeek}</div>
        </div>
      </div>
    );

    const renderAttachments = () => (
      <div className={style.eventAttachments}>
        {photos && (
          <img
            className={style.eventPhoto}
            src={status === EEventStatus.EXPECTED ? photos.bw : photos.color}
          />
        )}
        {attachments?.map((attachment) => {
          <a className={style.eventAttachmentLink} href={attachment.link}>
            <img className={style.eventAttachmentImg} src={attachment.img} />
          </a>;
        })}
      </div>
    );

    return (
      <div className={`${style.event} ${status === EEventStatus.ACTIVE && style.eventActive}  ${status === EEventStatus.EXPECTED && style.eventExpected}`}>
        {renderDate()}
        {renderAttachments()}
        <div className={style.eventBody}>
            <p className={style.eventDescription}>{description}</p>
            <h3 className={style.eventTitle}>{title}</h3>
            {action && <a className={style.eventAction} href={action.link}>{action.text}</a>}
        </div>
      </div>
    );
  }
);

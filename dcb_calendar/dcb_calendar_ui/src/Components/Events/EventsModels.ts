export interface IEvent {
  dateYear: string;
  attachments: IEventAttachments[];
  title: string;
  description: string;
  photos?: IEventPhotos;
  action?: IEventAction;
}

export interface IEventDate {
  day: string;
  month: string;
  dayWeek: string;
}

export interface IEventPhotos {
  color: string;
  bw: string;
}

export interface IEventAttachments {
  img: string;
  link: string;
}

export interface IEventAction {
  text: string;
  link: string;
}

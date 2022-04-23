export interface IEvent {
  id: number;
  action_link: string;
  action_text: string;
  attachments: IEventAttachments[];
  date: string;
  description: string;
  photo: string;
  title: string;
}

export interface IEventDate {
  day: string;
  month: string;
  dayWeek: string;
}

export interface IEventAttachments {
  id: number;
  image: string;
  link: string;
}

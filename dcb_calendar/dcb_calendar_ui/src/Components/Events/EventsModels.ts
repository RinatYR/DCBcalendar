export interface IEvent {
  id: number;
  action_link: string;
  action_text: string;
  date: string;
  description: string;
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

export interface IEventPhoto {
  id: number;
  image: string;
  event: number;
}
import { ISubcategory } from "../Filters/FiltersModels";

export interface IEvent {
  id: number;
  links: IEventAttachments[];
  link: string;
  date: string;
  created_at: string;
  date_end: string;
  description: string;
  title: string;
  place: string;
  format: string;
  category: ISubcategory[];
}

export interface IEventDate {
  day: string;
  month: string;
  dayWeek: string;
}

export interface IEventAttachments {
  id: number;
  text: string;
  link: string;
  event: number;
}

// export interface IEventAttachments {
//   id: number;
//   image: string;
//   link: string;
// }

// export interface IEventPhoto {
//   id: number;
//   image: string;
//   event: number;
// }
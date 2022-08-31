/**
 * Calendar info type
 */
export type TCalendarInfo = Record<string, Record<string, Record<string, boolean>>>;

/**
 * Day interface
 */
export interface IDay {
  num: number;
  dayName?: string;
  className: string;
}
import { TCalendarInfo } from "@/Components/Calendar/CalendarModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICalendarState {
  calendarInfo: TCalendarInfo;
}

const initialState: ICalendarState = {
  calendarInfo: {},
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar(state, action: PayloadAction<TCalendarInfo>) {
      state.calendarInfo = action.payload;
    },
  },
});

export default calendarSlice.reducer;
export const { setCalendar } = calendarSlice.actions;

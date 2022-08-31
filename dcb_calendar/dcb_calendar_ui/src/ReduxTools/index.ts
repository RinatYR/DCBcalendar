import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import calendarSlice from "./calendarSlice";
import eventsSlice from "./eventsSlice";
import filtersSlice from "./filtersSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    events: eventsSlice,
    filters: filtersSlice,
    calendar: calendarSlice,
  },
});
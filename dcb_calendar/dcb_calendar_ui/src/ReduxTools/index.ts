import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./eventsSlice";

export const store = configureStore({
  reducer: {
    events: eventsSlice,
  },
});
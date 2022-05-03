import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import eventsSlice from "./eventsSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    events: eventsSlice,
  },
});
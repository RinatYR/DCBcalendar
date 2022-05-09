import { IEvent } from "@/Components/Events/EventsModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEventState {
  eventsList: IEvent[];
}

const initialState: IEventState = {
  eventsList: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<IEvent[]>) {
      state.eventsList = action.payload;
    },
    addNextEvents(state, action: PayloadAction<IEvent[]>) {
      state.eventsList = [...state.eventsList, ...action.payload];
    },
    addPrevEvents(state, action: PayloadAction<IEvent[]>) {
      state.eventsList = [...action.payload, ...state.eventsList];
    },
  },
});

export default eventsSlice.reducer;
export const {setEvents, addNextEvents, addPrevEvents } = eventsSlice.actions;

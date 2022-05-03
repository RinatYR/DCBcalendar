import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  selectedDate: string;
  visibleDates: string[];
}

const initialState: IAppState = {
  selectedDate: "",
  visibleDates: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setVisibleDates(state, action: PayloadAction<string[]>) {
      if (
        state.visibleDates.length === action.payload.length &&
        state.visibleDates.every((val, idx) => val === action.payload[idx])
      )
        return;

      state.visibleDates = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setSelectedDate, setVisibleDates } = appSlice.actions;

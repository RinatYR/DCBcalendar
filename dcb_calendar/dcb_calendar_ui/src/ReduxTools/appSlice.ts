import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  selectedDate: string;
}

const initialState: IAppState = {
  selectedDate: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setSelectedDate } = appSlice.actions;

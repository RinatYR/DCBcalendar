import { ICategory } from "@/Components/Filters/FiltersModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFiltersState {
  filtersList: ICategory[];
  filter: number[];
}

const initialState: IFiltersState = {
  filtersList: [],
  filter: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter(state, action: PayloadAction<number>) {
      const newFilter = [...state.filter];
      const idxSelectedFilter = newFilter.indexOf(action.payload);
      if (idxSelectedFilter < 0) {
        newFilter.push(action.payload);
      }else {
        newFilter.splice(idxSelectedFilter, 1);
      }
      state.filter = newFilter;
    },
    resetFilter(state) {
      state.filter = [];
    },
    setFiltersList(state, action: PayloadAction<ICategory[]>) {
      state.filtersList = action.payload;
    },
  },
});

export default filtersSlice.reducer;
export const { toggleFilter, resetFilter, setFiltersList } = filtersSlice.actions;

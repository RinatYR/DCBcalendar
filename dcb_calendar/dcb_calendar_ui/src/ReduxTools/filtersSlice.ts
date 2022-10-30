import { ICategory } from "@/Components/Filters/FiltersModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFiltersState {
  filtersList: ICategory[];
  filter: IFilter;
}

export interface IFilter {
  categories: number[];
  search: string;
}

const initialState: IFiltersState = {
  filtersList: [],
  filter: {
    categories: [],
    search: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.filter = { categories: state.filter.categories, search: action.payload };
    },
    resetSearch(state) {
      state.filter = { categories: state.filter.categories, search: "" };
    },
    toggleCategories(state, action: PayloadAction<number>) {
      const newCategories = [...state.filter.categories];
      const idxSelectedFilter = newCategories.indexOf(action.payload);
      if (idxSelectedFilter < 0) {
        newCategories.push(action.payload);
      } else {
        newCategories.splice(idxSelectedFilter, 1);
      }
      state.filter = { categories: newCategories, search: state.filter.search };
    },
    resetCategories(state) {
      state.filter = { categories: [], search: state.filter.search };
    },
    setFiltersList(state, action: PayloadAction<ICategory[]>) {
      state.filtersList = action.payload;
    },
  },
});

export default filtersSlice.reducer;
export const {
  setSearch,
  resetSearch,
  toggleCategories,
  resetCategories,
  setFiltersList,
} = filtersSlice.actions;

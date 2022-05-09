import { setFiltersList } from "@/ReduxTools/filtersSlice";
import { useAppDispatch } from "@/ReduxTools/hooks";
import { getFiltersListService } from "@/Services/FiltersService";

interface IFiltersActions {
  getFiltersList: () => Promise<void>;
}

export const useFiltersActions = (): IFiltersActions => {
  const filtersDispatch = useAppDispatch();
  return {
    getFiltersList: () =>
      filtersDispatch(async (dispatch) => {
        const filtersList = await getFiltersListService();
        dispatch(setFiltersList(filtersList));
      }),
  };
};

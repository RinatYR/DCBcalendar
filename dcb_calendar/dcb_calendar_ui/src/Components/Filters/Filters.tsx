import { useFiltersActions } from "@/Actions/FiltersAction";
import { resetFilter, toggleFilter } from "@/ReduxTools/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect } from "react";
import style from "./Filters.less";

export const Filters: React.FC = () => {
  const filtersList = useAppSelector((state) => state.filters.filtersList);
  const filter = useAppSelector((state) => state.filters.filter);
  const appDispatch = useAppDispatch();
  const { getFiltersList } = useFiltersActions();

  useEffect(() => {
    getFiltersList();
  }, []);

  const handleCheckFilter = (id: number) => () => {
    appDispatch(toggleFilter(id));
  };

  const handleResetFilter = () => {
    appDispatch(resetFilter());
  };

  const renderCategories = (categoryList) => (
    <ul className={style.filtersList}>
      {categoryList.map((category) => {
        return (
          <li className={style.filtersItem} key={'subcategory'+category.id}>
            <label>
              <input
                className={style.filterCheckbox}
                type="checkbox"
                onChange={handleCheckFilter(category.id)}
                checked={filter.includes(category.id)}
              />
              <span>{category.name}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={style.filters}>
      {filtersList.map((category) => (
        <div key={'category'+category.id}>
          <h3 className={style.filtersTitle}>{category.name}</h3>
          {renderCategories(category.subcategories)}
        </div>
      ))}
      <button className={style.filtersButton} onClick={handleResetFilter}>Сбросить</button>
    </div>
  );
};

import { useFiltersActions } from "@/Actions/FiltersAction";
import { resetCategories, toggleCategories } from "@/ReduxTools/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/ReduxTools/hooks";
import React, { useEffect } from "react";
import style from "./Filters.less";
import {Calendar} from "@/Components/Calendar/Calendar";

export const Filters: React.FC = () => {
  const filtersList = useAppSelector((state) => state.filters.filtersList);
  const filterCategories = useAppSelector((state) => state.filters.filter.categories);
  const appDispatch = useAppDispatch();
  const { getFiltersList } = useFiltersActions();

  useEffect(() => {
    getFiltersList();
  }, []);

  const handleCheckCategory = (id: number) => () => {
    appDispatch(toggleCategories(id));
  };

  const handleResetCategories = () => {
    appDispatch(resetCategories());
  };

  const renderCategories = (categoryList) => (
    <ul className={style.filtersList}>
      {categoryList.map(({id, name, color}) => {
        const colorWithHash = color ? '#'+color : "#33bbaf";
        return (
          <li className={style.filtersItem} key={"subcategory" + id}>
            <label className={style.filtersLabel}>
              <input
                className={style.filterCheckbox}
                type="checkbox"
                onChange={handleCheckCategory(id)}
                checked={filterCategories.includes(id)}
              />
              <div
                className={style.filterFakeCheckbox}
                style={{ backgroundColor: colorWithHash, borderColor: colorWithHash }}
              />
              <span className={style.filterCheckboxName}>{name}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      <p className={style.filterName}>Фильтры</p>
      <div className={style.filters}>
        <Calendar />
        <div className={style.filtersWrap}>
          <div className={style.filtersTrack}>
        {filtersList.map((category) => (
          <div key={"category" + category.id}>
            <h3 className={style.filtersTitle}>{category.name}</h3>
            {renderCategories(category.subcategories)}
          </div>
        ))}
          </div>
        </div>
        <button className={style.filtersButton} onClick={handleResetCategories}>
          Очистить фильтры
        </button>
      </div>
    </div>
  );
};

import React from "react";
import style from "./Filters.less";

export const Filters: React.FC = () => {
  const directionsList = [
    { id: "1", name: "Финансы / экономика" },
    { id: "2", name: "Управление продуктом" },
    { id: "3", name: "Премии" },
    { id: "4", name: "Отрасли" },
    { id: "5", name: "Разработка" },
    { id: "6", name: "Дизайн" },
    { id: "7", name: "UX" },
  ];
  const areasList = [
    { id: "1", name: "Мир" },
    { id: "2", name: "Россия" },
    { id: "3", name: "Сбер" },
    { id: "4", name: "КИБ" },
    { id: "5", name: "ЦКБ" },
    { id: "6", name: "Команды" },
  ];

  const renderFilters = (filtersList, onChange) => (
    <ul className={style.filtersList}>
      {filtersList.map((filter) => {
        return (
          <li className={style.filtersItem}>
            <label>
              <input className={style.filterCheckbox} type="checkbox" onChange={onChange} />
              <span>{filter.name}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={style.filters}>
      <h3 className={style.filtersTitle}>НАПРАВЛЕНИЯ</h3>
      {renderFilters(directionsList, () => {})}
      <h3 className={style.filtersTitle}>УРОВЕНЬ СОБЫТИЯ</h3>
      {renderFilters(areasList, () => {})}
    </div>
  );
};

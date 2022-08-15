import React from "react";
import style from "./Search.less";

export const Search: React.FC = () => {
  return (
    <div className={style.search}>
      <p className={style.searchTitle}>Поиск событий</p>
      <div className={style.searchField}>
        <img src="./static/img/Search.svg" alt="logo" className={style.searchIcon} />
        <input
          className={style.searchInput}
          type="text"
          placeholder="Начните вводить название мероприятия"
        />
      </div>
    </div>
  );
};

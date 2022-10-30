import { useAppDispatch } from "@/ReduxTools/hooks";
import { setSearch } from "@/ReduxTools/filtersSlice";
import React, { useEffect, useRef, useState } from "react";
import style from "./Search.less";

export const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const timeoutId = useRef<number>();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = (setTimeout(
      () => appDispatch(setSearch(searchText)),
      400
    ) as unknown) as number;
  }, [searchText]);

  const onSearch = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  return (
    <div className={style.search}>
      {/* <p className={style.searchTitle}>Поиск</p> */}
      <div className={style.searchField}>
        <img src="./static/img/Search.svg" alt="logo" className={style.searchIcon} />
        <input
          className={style.searchInput}
          value={searchText}
          onChange={onSearch}
          type="text"
          placeholder="Начните вводить название мероприятия"
        />
      </div>
    </div>
  );
};

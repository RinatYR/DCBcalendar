import React from "react";
import { Search } from "../Search/Search";
import style from "./Header.less";

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <a href="/" className="headerLogo">
        <img src="./static/img/logo.svg" alt="logo" className="headerLogoImg" />
      </a>
      <Search />
      <div className={style.headerButtons}>
        <button className={style.headerButtonWhite}>Стать спикером</button>
        <button className={style.headerButtonWhite}>Участвовать в премии</button>
        <button className={style.headerButton}>Предложить событие</button>
      </div>
    </header>
  );
};

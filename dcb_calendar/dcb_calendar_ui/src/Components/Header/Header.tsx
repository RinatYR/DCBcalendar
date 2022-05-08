import React from "react";
import style from "./Header.less";

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <h1 className={style.headerTitle}>Календарь мероприятий</h1>
      <div className={style.headerYear}>2022</div>
      <button className={style.headerButton}>Предложить событие</button>
    </header>
  );
};

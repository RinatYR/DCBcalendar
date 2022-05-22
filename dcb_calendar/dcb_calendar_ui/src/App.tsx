import moment from "moment";
import React from "react";
import { Calendar } from "./Components/Calendar/Calendar";
import { EventsList } from "./Components/Events/EventsList";
import { Header } from "./Components/Header/Header";
import style from "./App.less";
import { Filters } from "./Components/Filters/Filters";
import { Banner } from "./Components/Banner/Banner";

export const App: React.FC = () => {
  moment.locale("ru");
  return (
    <div>
      <Header />
      <div className={style.container}>
        <aside className={style.sidebar}>
          <Filters />
        </aside>
        <div className={style.body}>
          <div className={style.calendarWrap}>
            <Calendar />
            <Banner />
          </div>
          <EventsList />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Calendar } from "./Components/Calendar/Calendar";
import { EventsItem } from "./Components/Events/EventsItem";
import { EventsList } from "./Components/Events/EventsList";
import { EEventStatus } from "./Enums/Events";

export const App: React.FC = () => {

  return (
    <div>
      <Calendar
        year={2022}
        selectedMonth={2}
        selectedDay={21}
        highlightDayStart={21}
        highlightDayEnd={27}
      />
      <EventsItem
        date={{ day: "01", month: "Февраля", dayWeek: "Вторник" }}
        photos={{
          color:
            "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          bw:
            "https://images.unsplash.com/photo-1499417267106-45cebb7187c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1019&q=80",
        }}
        status={EEventStatus.EXPIRED}
        attachments={[
          {
            img: "https://cdn-icons-png.flaticon.com/512/152/152810.png",
            link: "https://yandex.ru",
          },
        ]}
        title={
          "Поздравление мужчин Цифрового Корпоративного Банка с 23 февраля"
        }
        description={"Цифровой Корпоративный Банк"}
        action={{ text: "стать спикером", link: "https://yandex.ru" }}
      />
      <EventsList />
    </div>
  );
};

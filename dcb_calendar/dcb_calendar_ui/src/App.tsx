import moment from "moment";
import React from "react";
import { Calendar } from "./Components/Calendar/Calendar";
import { EventsList } from "./Components/Events/EventsList";

export const App: React.FC = () => {
  moment.locale("ru");
  return (
    <div>
      <Calendar />
      <EventsList />
    </div>
  );
};

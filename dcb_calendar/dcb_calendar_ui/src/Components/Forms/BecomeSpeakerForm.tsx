import React from "react";
import { Form, IFormField } from "../Form/Form";

interface IBecomeSpeakerForm {
  onClose(): void;
  onShow?: boolean;
}

export const BecomeSpeakerForm: React.FC<IBecomeSpeakerForm> = ({ onClose, onShow = false }) => {
  const fields: IFormField[] = [
    { key: "title", value: "Стать спикером", hidden: true, name: "title" },
    { key: "direction", placeholder: "Направление*", required: true, name: "direction" },
    {
      key: "eventName",
      placeholder: "Укажите название мероприятия, если точно знаете, где хотите выступить",
      textarea: true,
      name: "eventName",
    },
    { key: "theme", placeholder: "На какую тему хотите выступить*", required: true, name: "theme" },
    {
      key: "why",
      placeholder: "Опишите парой фраз, почему это будет интересно услышать аудитории*",
      textarea: true,
      required: true,
      name: "why",
    },
    { key: "name", placeholder: "ФИО, команда, роль", name: "name", maxLength: 256 },
    {
      key: "email",
      type: "email",
      placeholder: "Email*",
      required: true,
      name: "email",
      maxLength: 128,
    },
  ];

  return onShow ? (
    <Form title={"Стать спикером"} submitText={"Отправить"} fields={fields} onClose={onClose} />
  ) : null;
};

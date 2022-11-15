import React from "react";
import { Form, IFormField } from "../Form/Form";

interface ISuggestEventForm {
  onClose(): void;
  onShow?: boolean;
}

export const SuggestEventForm: React.FC<ISuggestEventForm> = ({ onClose, onShow = false }) => {
  const fields: IFormField[] = [
    { key: "title", value: "Предложить событие", hidden: true, name: "title" },
    { key: "eventName", placeholder: "Название события*", required: true, name: "eventName" },
    { key: "link", placeholder: "Ссылка*", required: true, name: "link" },
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
    <Form
      title={"Предложить событие"}
      submitText={"Предложить"}
      fields={fields}
      onClose={onClose}
    />
  ) : null;
};

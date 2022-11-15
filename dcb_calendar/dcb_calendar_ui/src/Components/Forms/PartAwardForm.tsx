import React from "react";
import { Form, IFormField } from "../Form/Form";

interface IPartAwardForm {
  onClose(): void;
  onShow?: boolean;
}

export const PartAwardForm: React.FC<IPartAwardForm> = ({ onClose, onShow = false }) => {
  const fields: IFormField[] = [
    { key: "title", value: "Участвовать в премии", hidden: true, name: "title" },
    { key: "awardName", placeholder: "Название премии*", required: true, name: "awardName" },
    {
      key: "award",
      placeholder: "Опишите кратко продукт или решение, которые вы хотите подать на премию*",
      textarea: true,
      required: true, name: "award"
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
    <Form
      title={"Участвовать в премии"}
      submitText={"Отправить"}
      fields={fields}
      onClose={onClose}
    />
  ) : null;
};

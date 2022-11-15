import { sendContactForm } from "@/Services/FormService";
import React, { useState } from "react";
import style from "./Form.less";

interface IFormProps {
  title: string;
  submitText: string;
  fields: IFormField[];
  onClose(): void;
}

export interface IFormField extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  key: string;
  textarea?: boolean;
}

export const Form: React.FC<IFormProps> = ({ title, submitText, fields, onClose }) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = fields.reduce(
      (data, field) => {
        if (!field.name) return data;
        const fieldName = field.name;
        const inputData = e.target[fieldName];
        if (fieldName == "title" || fieldName == "name" || fieldName == "email") {
          data[fieldName] = inputData.value;
        } else {
          data.description += `${inputData.placeholder}: ${inputData.value},\n\n`;
        }
        return data;
      },
      { title: "", name: "", email: "", description: "" }
    );
    sendContactForm(formData).then(
      (res) => {
        if (res.status === 200) {
          res.json().then((msg) => setSuccess(msg));
        } else {
          res.json().then((msg) => setError(msg));
        }
      },
      () => {
        setError("Произошла неизвестная ошибка, попробуйте отправить форму ещё раз!");
      }
    );
  };

  if (success)
    return (
      <div className={style.formWrap}>
        <div className={style.form}>
          <div className={style.formClose} onClick={onClose}></div>
          <div className={style.formSuccess}>{success}</div>
        </div>
      </div>
    );

  return (
    <div className={style.formWrap}>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.formClose} onClick={onClose}></div>
        <p className={style.formTitle}>{title}</p>
        {fields.map(({ textarea, type, ...inputProps }) => {
          return textarea ? (
            <textarea
              {...((inputProps as unknown) as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              className={`${style.formInput} ${style.formTextarea}`}
            />
          ) : (
            <input {...inputProps} className={style.formInput} type={type || "text"} />
          );
        })}
        {error && <div className={style.formError}>{error}</div>}
        <button className={style.formButton} type="submit">
          {submitText}
        </button>
      </form>
    </div>
  );
};

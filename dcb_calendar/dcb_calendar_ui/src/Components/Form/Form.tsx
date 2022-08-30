import React from "react";
import style from "./Form.less";

interface IFormProps {
  title: string;
  submitText: string;
  fields: IFormField[];
}

export interface IFormField
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  textarea?: boolean;
}

export const Form: React.FC<IFormProps> = ({ title, submitText, fields }) => {
  return (
    <form className={style.form}>
      <p className={style.formTitle}>{title}</p>
      {fields.map(({ textarea, type, ...inputProps }) => {
        return textarea ? (
          <textarea
            {...((inputProps as unknown) as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`${style.formInput} ${style.formTextarea}`}
          />
        ) : (
          <input
            {...inputProps}
            className={style.formInput}
            type={type || "text"}
          />
        );
      })}
      <button className={style.formButton} type="submit">
        {submitText}
      </button>
    </form>
  );
};

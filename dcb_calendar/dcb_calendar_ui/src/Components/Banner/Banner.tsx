import React from "react";
import style from "./Banner.less";

export const Banner: React.FC = () => {
  const mainEvent = {
    image: "https://w-dog.ru/wallpapers/10/18/464728990985141/priroda-gory-kamni-les.jpg",
    title: "Лидер трайба рекомендует",
    desciption: "Бизнес-конференция 2022",
    actionText: "Перейти",
    actionLink: "yandex.ru",
  };

  return (
    <div className={style.banner}>
      <img className={style.bannerImage} src={mainEvent.image} />
      <div className={style.bannerInfo}>
        <h2 className={style.bannerTitle}>{mainEvent.title}</h2>
        <p className={style.bannerDescription}>{mainEvent.desciption}</p>
        <a className={style.bannerButton} href={mainEvent.actionLink}>
          {mainEvent.actionText}
        </a>
      </div>
    </div>
  );
};

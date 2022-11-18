import React, { useState } from "react";
import { BecomeSpeakerForm } from "../Forms/BecomeSpeakerForm";
import { PartAwardForm } from "../Forms/PartAwardForm";
import { SuggestEventForm } from "../Forms/SuggestEventForm";
import { Search } from "../Search/Search";
import style from "./Header.less";

export const Header: React.FC = () => {
  const [showBecomeSpeakerForm, setShowBecomeSpeakerForm] = useState(false);
  const [showPartAwardForm, setShowPartAwardForm] = useState(false);
  const [showSuggestEventForm, setShowSuggestEventForm] = useState(false);

  return (
    <>
      <header className={style.header}>
        <div className={style.headerContainer}>
          <a href="/" className={style.headerLogo}>
            <img src="./static/img/logo.svg" alt="logo" className={style.headerLogoImg} />
          </a>
          <Search />
          <div className={style.headerButtons}>
            <button
              className={style.headerButtonWhite}
              onClick={() => setShowBecomeSpeakerForm(true)}
            >
              Стать спикером
            </button>
            <button className={style.headerButtonWhite} onClick={() => setShowPartAwardForm(true)}>
              Участвовать в премии
            </button>
            <button className={style.headerButton} onClick={() => setShowSuggestEventForm(true)}>
              Предложить событие
            </button>
          </div>
        </div>
      </header>
      <BecomeSpeakerForm
        onShow={showBecomeSpeakerForm}
        onClose={() => setShowBecomeSpeakerForm(false)}
      />
      <PartAwardForm onShow={showPartAwardForm} onClose={() => setShowPartAwardForm(false)} />
      <SuggestEventForm
        onShow={showSuggestEventForm}
        onClose={() => setShowSuggestEventForm(false)}
      />
    </>
  );
};

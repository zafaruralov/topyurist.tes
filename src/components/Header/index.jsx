import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { languages } from "../../services/const";
import { userInfo, isLawyer } from "../../services/helpers";

// assets
import imageLogo from "../../assets/images/header/logo.svg";
import imageLink_1 from "../../assets/images/header/link-1.svg";
import imageLink_1st from "../../assets/images/header/linkst-1.svg";
import imageLink_2 from "../../assets/images/header/link-2.svg";
import imageLink_2st from "../../assets/images/header/linkst-2.svg";
import imageLink_3 from "../../assets/images/header/link-3.svg";
import imageLink_3st from "../../assets/images/header/linkst-3.svg";
import imageLink_4 from "../../assets/images/header/link-4.svg";
import imageLink_4st from "../../assets/images/header/linkst-4.svg";
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import iconBurgerOpen from "../../assets/images/mobile-burger-open.svg";
import iconBurgerClose from "../../assets/images/mobile-burger-close.svg";

const Index = () => {
  const { i18n, t } = useTranslation();

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const toggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  return (
    <header className={`header ${isHeaderOpen && "opened"} `}>
      <div className="header__content container">
        <NavLink
          onClick={toggleHeader}
          to={isLawyer() ? "/service" : "/requests"}
          className="header__logo"
        >
          <img className="header__logo-img" src={imageLogo} alt="logo" />
        </NavLink>
        <div className="header__links">
          {isLawyer() && (
            <NavLink
              onClick={toggleHeader}
              className="header__link"
              to="/service"
            >
              <div className="header__link-img">
                <img className="stroke" src={imageLink_1} alt="icon" />
                <img className="solid" src={imageLink_1st} alt="icon" />
              </div>
              <p className="header__link-txt">{t("services")}</p>
            </NavLink>
          )}
          {!isLawyer() && (
            <NavLink
              onClick={toggleHeader}
              className="header__link"
              to="/requests"
            >
              <div className="header__link-img">
                <img className="stroke" src={imageLink_1} alt="icon" />
                <img className="solid" src={imageLink_1st} alt="icon" />
              </div>
              <p className="header__link-txt">{t("requests")}</p>
            </NavLink>
          )}
          <NavLink onClick={toggleHeader} className="header__link" to="/chat">
            <div className="header__link-img">
              <img className="stroke" src={imageLink_2} alt="icon" />
              <img className="solid" src={imageLink_2st} alt="icon" />
            </div>
            <p className="header__link-txt">{t("chats")}</p>
          </NavLink>
          <NavLink
            onClick={toggleHeader}
            className="header__link"
            to="/favorite"
          >
            <div className="header__link-img">
              <img className="stroke" src={imageLink_3} alt="icon" />
              <img className="solid" src={imageLink_3st} alt="icon" />
            </div>
            <p className="header__link-txt">{t("favorites")}</p>
          </NavLink>
          <NavLink
            onClick={toggleHeader}
            className="header__link"
            to="/profile/personal-data"
          >
            <div className="header__link-img">
              <img className="stroke" src={imageLink_4} alt="icon" />
              <img className="solid" src={imageLink_4st} alt="icon" />
            </div>
            <p className="header__link-txt">{t("profile")}</p>
          </NavLink>
        </div>
        <div className="header__lang">
          <ul className="header__lang-list">
            {languages.map((el, ind) => (
              <li
                key={`${el.key}-${ind}`}
                // onClick={() => handleChangeLang(el.key)}
                className={`header__lang-item ${
                  currentLang === el.key && "current"
                }`}
              >
                {el.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="header__avatar">
          <img
            className="header__avatar-img"
            src={userInfo().profile_photo || iconAvatar}
            alt="ava"
          />
        </div>
        <div className="header__burger">
          <button className="header__burger-btn" onClick={toggleHeader}>
            <img src={iconBurgerOpen} alt="open" />
            <img src={iconBurgerClose} alt="close" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Index;

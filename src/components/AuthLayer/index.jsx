import React from "react";

// assets
import imageLogo from "../../assets/images/logo-colored.svg";
import imageBack from "../../assets/images/login/login-background.png";

import { languages } from "../../services/const";
import { useTransition } from "react";
import { useState } from "react";

const Index = () => {
  const { i18n } = useTransition();
  const [currentLang, setCurrentLang] = useState("Eng");

  const handleChangeLang = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <div className="auth_interactives">
      <div className="auth_logo">
        <img className="auth_logo-img" src={imageLogo} alt="logo" />
      </div>
      <div className="auth_languages">
        {languages.map((el, ind) => (
          <p
            key={`${el.key}-${ind}`}
            onClick={() => handleChangeLang(el.key)}
            className={`auth_language ${
              currentLang === el.key && "current"
            } disable-text`}
          >
            {el.title}
          </p>
        ))}
      </div>
      <div className="auth_bgimage">
        <img src={imageBack} alt="" className="auth_bgimage-img" />
      </div>
      <p className="auth_credentials">© 2018–2022 Top Yurist</p>
    </div>
  );
};

export default Index;

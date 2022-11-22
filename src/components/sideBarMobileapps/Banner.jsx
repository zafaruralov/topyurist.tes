import React from "react";
import { useTranslation } from "react-i18next";

// assets
import iconAppleStore from "../../assets/images/icon-banner-appstore.svg";
import iconGoogleStore from "../../assets/images/icon-banner-google.svg";
import backgroundBanner from "../../assets/images/banner-bg.png";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="banner">
      <div className="banner__content">
        <h2 className="banner__title">{t("download_app")}</h2>
        <a href="#!" className="banner__storeimg">
          <img src={iconAppleStore} alt="store icon" />
        </a>
        <a href="#!" className="banner__storeimg">
          <img src={iconGoogleStore} alt="store icon" />
        </a>
        <img src={backgroundBanner} alt="banner" className="banner__bgimg" />
      </div>
    </div>
  );
};

export default Banner;

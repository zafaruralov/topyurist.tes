import React from "react";
import { useTranslation } from "react-i18next";

const Index = (type = "") => {
  const { t } = useTranslation();

  return (
    <div className={`loader ${type ? type : ""}`}>
      <div className="loader__pins">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h2 className="loader__title"> {t("loading")} </h2>
    </div>
  );
};

export default Index;

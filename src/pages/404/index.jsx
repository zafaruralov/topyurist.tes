import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import Button from "../../components/Button";
import { isLawyer } from "../../services/helpers";

// assets
import fofImage1 from "../../assets/images/404/img-1.svg";
import fofImage2 from "../../assets/images/404/img-2.svg";

const Index = () => {
  const { t } = useTranslation();

  return (
    <section className="fof">
      <div className="fof__content">
        <div className="fof__imgs">
          <img src={fofImage1} alt="fof" />
          <img src={fofImage2} alt="fof" />
        </div>
        <div className="fof__body">
          <p className="fof__body-title">404</p>
          <p className="fof__body-txt"> {t("smth_went_wrong")}  </p>
          <NavLink to={isLawyer() ? "/" : "/requests"}>
            <Button title="Вернутся на главную" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Index;

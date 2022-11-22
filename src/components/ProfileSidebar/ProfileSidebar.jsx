import React from "react";
import { NavLink } from "react-router-dom";
import { isLawyer } from "../../services/helpers";

// assets
import iconArrow from "../../assets/images/icon-arrowshort.svg";
import iconNav from "../../assets/images/icon-arrowblue.svg";
import iconSidebar1 from "../../assets/images/icon-sidebar-profile.svg";
import iconSidebar2 from "../../assets/images/icon-sidebar-verf.svg";
import iconSidebar3 from "../../assets/images/icon-sidebar-fav.svg";
import iconSidebar4 from "../../assets/images/icon-sidebar-faq.svg";
import iconSidebar5 from "../../assets/images/icon-sidebar-logout.svg";

import { useTranslation } from "react-i18next";
import { useState } from "react";

const ProfileSidebar = () => {
  const { t } = useTranslation();
  const [isMobileOpen, setIsModalOpen] = useState(false);

  const toggleMobile = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className={`prsidebar__toggler ${isMobileOpen && "mobileopened"}`}>
        <p className="prsidebar__togger-text"> {t("navigation")} </p>
        <img src="" alt="icon" className="prsidebar__toggler-img" />
      </div>
      <div className={`prsidebar__ ${isMobileOpen && "mobileopened"}`}>
        <div className="prsidebar__links">
          <NavLink className="prsidebar__link current">
            <img src="" alt="" className="prsidebar__link-icon filternone" />
            <p className="prsidebar__link-title"> {t("personal_data")} </p>
            <img src="" alt="" className="prsidebar__link-arrow" />
          </NavLink>
          {isLawyer() && (
            <NavLink className="prsidebar__llink">
              <img src="" alt="" className="prsidebar__link-icon filternone" />
              <p className="prsidebar__link-title"> {t("varification")} </p>
              <img src="" alt="" className="prsidebar__link-arrow" />
            </NavLink>
          )}
          {isLawyer() && (
            <NavLink
              onClick={toggleMobile}
              className="prsidebar__link"
              to="/profile/verification"
            >
              <img
                className="prsidebar__link-icon filternone"
                src={iconSidebar2}
                alt="icon"
              />
              <p className="prsidebar__link-title">{t("verification")}</p>
              <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
            </NavLink>
          )}
          {isLawyer() && (
            <NavLink
              onClick={toggleMobile}
              className="prsidebar__link"
              to="/templates"
            >
              <img
                className="prsidebar__link-icon"
                src={iconSidebar1}
                alt="icon"
              />
              <p className="prsidebar__link-title">{t("templates")}</p>
              <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
            </NavLink>
          )}
          {isLawyer() && (
            <NavLink
              onClick={toggleMobile}
              className="prsidebar__link"
              to="/profile/lawyer-feedbacks"
            >
              <img
                className="prsidebar__link-icon"
                src={iconSidebar3}
                alt="icon"
              />
              <p className="prsidebar__link-title">{t("comments")}</p>
              <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
            </NavLink>
          )}
          {!isLawyer() && (
            <NavLink
              onClick={toggleMobile}
              className="prsidebar__link"
              to="/profile/user-feedbacks"
            >
              <img
                className="prsidebar__link-icon"
                src={iconSidebar3}
                alt="icon"
              />
              <p className="prsidebar__link-title">{t("my_comments")}</p>
              <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
            </NavLink>
          )}
        </div>
        <div className="prsidebar__links">
          <NavLink
            onClick={toggleMobile}
            className="prsidebar__link"
            to="/profile/supportchat"
          >
            <img
              className="prsidebar__link-icon"
              src={iconSidebar1}
              alt="icon"
            />
            <p className="prsidebar__link-title">{t("support_chat")}</p>
            <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
          </NavLink>
          <NavLink
            onClick={toggleMobile}
            className="prsidebar__link"
            to="/profile/faq"
          >
            <img
              className="prsidebar__link-icon"
              src={iconSidebar4}
              alt="icon"
            />
            <p className="prsidebar__link-title">FAQ</p>
            <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
          </NavLink>
        </div>
        <div className="prsidebar__links">
          <NavLink
            onClick={toggleMobile}
            className="prsidebar__link"
            to="/login"
          >
            <img
              className="prsidebar__link-icon"
              src={iconSidebar5}
              alt="icon"
            />
            <p className="prsidebar__link-title">{t("log_out")}</p>
            <img className="prsidebar__link-arrow" src={iconArrow} alt="" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;

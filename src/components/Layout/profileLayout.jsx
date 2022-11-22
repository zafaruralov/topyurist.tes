import React from "react";
import { Outlet } from "react-router-dom";

// components
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.jsx";
import Titling from "../../components/Titling";
import { useTranslation } from "react-i18next";

const ProfileLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="profile">
      <div className="profile__content continer">
        <Titling title={t("profile")} />
        <div className="profile__body">
          <ProfileSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;

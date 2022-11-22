import React from "react";

// assets
import iconAvatar from "../../assets/images/icon-useravatar.svg";

const index = ({ info }) => {
  const { dialog_user_name, dialog_user_photo } = info;
  return (
    <div className="personcard">
      <img
        src={dialog_user_photo || iconAvatar}
        alt="ava"
        className="personcard__img"
      />
      <div>
        <h3 className="personcard-name">{dialog_user_name}</h3>
      </div>
    </div>
  );
};

export default index;

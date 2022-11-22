import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Tabs from "../../components/Tabs";
import Titling from "../../components/Titling";
import CustomLoader from "../../components/Loader";

// assets
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import iconLocation from "../../assets/images/icon-location.svg";

const feedbacksLawyer = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const changeTab = (tab) => {
    setFilter(tab.value);
  };

  // const changeReviewShowStatus = useMutae({})

  if (isLoading) return <CustomLoader />;
  if (isError) return <p>Error</p>;

  const tabs = [
    {
      title: "all",
      isSelected: true,
      value: "all",
    },
    {
      title: "accepted",
      isSelected: false,
      value: "accepted",
    },
    {
      title: "rejected",
      isSelected: false,
      value: "rejected",
    },
  ];

  return (
    <div className="pffeeds">
      <Titling title={t("lawyer_review")} />
      <Tabs tabitems={tabs} changeTab={changeTab} />

      <div className="pffeeds__list">
        {data.data.map((item) => (
          <div className="case__card" key={item.id}>
            <div className="case__card-cap">
              <img
                src={item.lawer_profile_photo || iconAvatar}
                alt="avatar"
                className="case__card-img"
              />
              <h3 className="case__card-title"> {item.lawer_full_name} </h3>
              <span className="case__card-status">
                {item.state === "ACCEPTED" ? t("solved") : t("not_solved")}
              </span>
            </div>
            <div className="case__card-body">
              <p>{item.state_reason}</p>
            </div>
            <div className="case__card-credentials">
              <div className="case__card-credential">
                <p> {new Date(item.created_at).toLocaleDateString("en-US")} </p>
              </div>
            </div>
            <div className="case__card-showfeed">
              <p className="case__card-showfeedtxt">
                {t("show_feedback_on_your_profile")}
              </p>
              <div className="case__card-checkbox">
                <input
                  type="checkbox"
                  id="check1"
                  checked={item.shaw_in_lawyer_profile}
                  onChange={(e) => toggleReview(e, item.id)}
                />
                <label htmlFor="check1">
                  <span></span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default feedbacksLawyer;

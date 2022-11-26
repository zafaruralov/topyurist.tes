import React from "react";
import { useTranslation } from "react-i18next";

// components
import Tabs from "../../components/Tabs";
import CustomLoader from "../../components/Loader";
import Titling from "../../components/Titling";

// assets
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import iconLocation from "../../assets/images/icon-location.svg";

// consta
const tabs = [
  { title: "all", isSelected: true },
  { title: "solved", isSelected: false },
  { title: "un_solved", isSelected: false },
];
const data = []

const Index = () => {
  const { t } = useTranslation();

  // const { data, isLoading, isError } = useGet({ ==========>
  //   link: "/profile/review/customer_page",
  // });

  // if (isLoading) return <CustomLoader />;
  // if (isError) return <p>Error</p>;

  return (
    <div className="pffeeds">
      <Titling title={t("my_reviews")} />
      <Tabs tabitems={tabs} />

      <div className="pffeeds__list">
        {data.map((item) => (
          <div className="case__card" key={item.id}>
            <div className="case__card-cap">
              <img
                src={item.owner_profile_photo || iconAvatar}
                alt="avatar"
                className="case__card-img"
              />
              <h3 className="case__card-title">Вы</h3>
              <span className="case__card-status">
                {item.state === "ACCEPTED" ? t("solved") : t("not_solved")}
              </span>
            </div>
            <div className="case__card-body">
              <p>{item.state_reason}</p>
            </div>
            <div className="case__card-credentials">
              <div className="case__card-credential">
                <p>{new Date(item.created_at).toLocaleDateString("en-US")}</p>
              </div>
            </div>
            <div className="case__card-lawyer">
              <img
                src={item.lawer_profile_photo || iconAvatar}
                alt="avatar"
                className="case__card-lawyer-img"
              />
              <p className="case__card-lawyer-name"> {item.lawer_full_name} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

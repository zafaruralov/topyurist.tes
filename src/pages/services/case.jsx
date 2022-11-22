import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { languageCombination } from "../../services/helpers";

import Banner from "../../components/sideBarMobileapps/Banner";

// assets
import iconLocation from "../../assets/images/icon-location.svg";
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import iconArrowback from "../../assets/images/icon-arrowback.svg";

const applications = [
  {
    created_at: 168807846589,
    deleted: false,
    description: "",
    id: "15f2v1df56sc2",
    is_favorite: false,
    lawyer_id: null,
    offer_state: "active",
    owner_full_name: "Zafarjon",
    owner_id: "dw4e230vffew230",
    owner_profile_photo: null,
    photos: [],
    private_phone: true,
    problem_type: { us_en: "Criminal case", uz_lat: "Jinoyat ishi" },
    problem_type_id: "wd84e1vf589tr41",
    region_id: 4561,
    region_title: {
      us_en: "Tashkent city",
      uz_lat: "Toshkent shahri",
      us_en: "Andijan region",
      us_en: "Bukhara region",
      us_en: "Kashkadarya region",
      us_en: "Navoi region",
      us_en: "Namangan region",
      us_en: "Samarkand region",
    },
    state: "PUBLISHED",
    updated_at: null,
    updated_id: null,
  },
];

const regions = [
  { us_en: "Tashkent city" },
  { us_en: "Andijan region" },
  { us_en: "Bukhara region" },
  { us_en: "Kashkadarya region" },
  { us_en: "Navoi region" },
  { us_en: "Namangan region" },
  { us_en: "Samarkand region" },
];
const regionAll = {
  id: "all",
  title: {
    us_en: "All",
    ru_ru: "Все",
    uz_lat: "Barchasi",
    uz_uz: "Barchasi",
  },
};

const Case = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [activeRegion, setActiveRegion] = useState("all");

  return (
    <section className="case">
      <div className="case__content container">
        {/* <Breadcumbs crumbs={crumbs} /> */}
        <div className="caserequest__body-btn" onClick={() => navigate(-1)}>
          <img src={iconArrowback} alt="arrow" />
          <p>{t("back")}</p>
        </div>
        {/* <Tabs tabitems={tabs} changeTab={changeTab} /> */}
        <div className="case__body">
          <div className="case__context">
            {applications.map((item, index) => (
              <Link
                className="case__card"
                key={`${item.id}${index}`}
                to={`/case/${params.id}/${item.id}`}
              >
                <div className="case__card-cap">
                  <img
                    src={item.owner_profile_photo || iconAvatar}
                    alt="avatar"
                    className="case__card-img"
                  />
                  <h3 className="case__card-title">{item.owner_full_name}</h3>
                  <span
                    className={`case__card-heart ${
                      item.is_favorite && "checked"
                    } `}
                    // onClick={(e) => handleFavourite(e, item.id)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7003 2.58325C12.192 2.58325 10.842 3.31659 10.0003 4.44159C9.15866 3.31659 7.80866 2.58325 6.30033 2.58325C3.74199 2.58325 1.66699 4.66659 1.66699 7.24159C1.66699 8.23325 1.82533 9.14992 2.10033 9.99992C3.41699 14.1666 7.47533 16.6583 9.48366 17.3416C9.76699 17.4416 10.2337 17.4416 10.517 17.3416C12.5253 16.6583 16.5837 14.1666 17.9003 9.99992C18.1753 9.14992 18.3337 8.23325 18.3337 7.24159C18.3337 4.66659 16.2587 2.58325 13.7003 2.58325Z"
                        fill="#1C4FD1"
                      />
                    </svg>
                  </span>
                </div>
                <div className="case__card-body">
                  <p> {item.description} </p>
                </div>
                <div className="case__card-credentials">
                  {item?.region_title && (
                    <div className="case__card-credential">
                      <img src={iconLocation} alt="location" />
                      <p>
                        {item.region_title[languageCombination(i18n.language)]}
                      </p>
                    </div>
                  )}
                  <div className="case__card-credential">
                    <p>
                      {new Date(item.created_at).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="case__sidebar">
            <div className="case__sidebar-context">
              <h3 className="case__sidebar-title">{t("regions")}</h3>
              <ul className="case__sidebar-list">
                {/* {[regionAll, ...regions].map((item, index) => ( */}
                {[regionAll].map((item, index) => (
                  <li
                    className="case__sidebar-item"
                    key={`${item.id}-${index}`}
                  >
                    <input
                      type="radio"
                      name={"region"}
                      id={`filter_${index}`}
                      checked={item.id === activeRegion}
                      //   onChange={() => checkRegions(item.id)}
                    />
                    <label htmlFor={`filter_${index}`}>
                      {item?.title[languageCombination(i18n.language)]}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <Banner />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Case;

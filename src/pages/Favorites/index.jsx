import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { languageCombination, isLawyer } from "../../services/helpers";

// componenets
import Titling from "../../components/Titling";
import Banner from "../../components/sideBarMobileapps/Banner";
import CustomLoader from "../../components/Loader";

// assets
import iconLocation from "../../assets/images/icon-location.svg";
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import { ToastSuccess } from "../../components/Toast";

const Index = () => {
  const { t, i18n } = useTranslation();

  // const { data, isLoading, isError, refetch } = {
  //   link: `/user/favorite/${isLawyer() ? "lawyer_page" : "customer_page"}`,
  // };
  const data = [
    {
      chat_id: null,
      created_at: 1668093015670,
      description: "вааададададабабабсбс",
      full_name: "Аааа",
      id: "4f4adbee-b27e-7e27-eede-c5d26c353e38",
      profile_photo: null,
      region_id: 1708,
      region_title: {
        us_en: "Jizzakh region",
        ru_ru: "Джизакская область",
        uz_lat: "Jizzax region",
      },
    },
  ];

  // const deleteFavorite = {
  //   onSuccess: function () {
  //     refetch();
  //     ToastSuccess(t("favorite_deleted"));
  //   },
  // };

  // const removeFavorite = (e, id) => {
  //   e.preventDefault();
  //   const apiType = isLawyer() ? "application" : "user";
  //   deleteFavorite.mutate({
  //     method: "patch",
  //     link: `/${apiType}/favorite/remove?id=${id}`,
  //   });
  // };

  // if (isLoading) return <CustomLoader type="fixed" />;
  // if (isError) return <p>Error</p>;
  // if (data.length === 0) return <Navigate to="/favoritempty" />;

  return (
    <section className="favorites">
      <div className="favorites__content container">
        <Titling title={t("favorites")} />

        <div className="favorites__body">
          {isLawyer() && (
            <div className="favorites__context">
              {data.map((item, index) => (
                <Link
                  className="case__card"
                  key={`${item.id}-${index}`}
                  to={`/`}
                >
                  <div className="case__card-cap">
                    <img
                      alt="avatar"
                      className="case__card-img"
                      src={item.profile_photo || iconAvatar}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = iconAvatar;
                      }}
                    />
                    <h3 className="case__card-title">{item.full_name}</h3>
                    <span
                      className="case__card-heart checked"
                      // onClick={(e) => removeFavorite(e, item.id)}
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
                    <p>{item.description}</p>
                  </div>
                  <div className="case__card-credentials">
                    <div className="case__card-credential">
                      <img src={iconLocation} alt="location" />
                      <p>
                        {item.region_title[languageCombination(i18n.language)]}
                      </p>
                    </div>
                    <div className="case__card-credential">
                      <p>
                        {new Date(item.created_at).toLocaleDateString("en-US")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {!isLawyer() && (
            <div className="favorites__context">
              {data.map((item, index) => (
                <Link
                  className="case__card user"
                  key={`${item.id}-${index}`}
                  to={`/requests`}
                >
                  <div className="case__card-cap user">
                    <div className="case__card-favlawyer">
                      <img
                        src={item.profile_photo && iconAvatar}
                        alt="avatar"
                        className="case__card-favlawyer-img"
                      />
                      <div className="case__card-favlawyer-body">
                        <h3 className="case__card-favlawyer-name">
                          {item.full_name}
                        </h3>
                        <p className="case__card-favlawyer-status">
                          {item.lawyer_state === "UNVERIFIED"
                            ? "Tasdiqlanmagan"
                            : "Tasdiqlangan"}
                        </p>
                      </div>
                    </div>
                    <span
                      className="case__card-heart checked"
                      // onClick={(e) => removeFavorite(e, item.id)}
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
                  <div className="case__card-credentials">
                    <div className="case__card-credential">
                      <p>
                        {new Date(item.created_at).toLocaleDateString("en-US")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <Banner />
        </div>
      </div>
    </section>
  );
};

export default Index;

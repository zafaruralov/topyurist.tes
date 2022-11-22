import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { userInfo, languageCombination } from "../../services/helpers";

// import { useGet, useMutate } from "../../hooks/query";

// components
import Modal from "../../components/Modal";
import Breadcumbs from "../../components/Breadcumbs";
import Button from "../../components/Button";
import Titling from "../../components/Titling";
import CustomLoader from "../../components/Loader";

// assets
import iconLocation from "../../assets/images/icon-location.svg";
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import iconArrowback from "../../assets/images/icon-arrowback.svg";
import { ToastSuccess, ToastWarning } from "../../components/Toast";

const Index = () => {
  const { id } = useParams();
  const params = useParams();
  const navigate = useNavigate();
  const modal = useRef(null);
  const { t, i18n } = useTranslation();

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [prevPageTitle, setPrevpageTitle] = useState("");

  const [activeTemplate, setActiveTemplate] = useState({});
  const previusPageId = params["*"].split("/")[1];

  // useGet({
  //   link: "/problem_type/list",
  //   onSuccess: (data) => {
  //     let foundData = data.find((el) => el.id === previusPageId);
  //     setPrevpageTitle(
  //       () => foundData.title[languageCombination(i18n.language)]
  //     );
  //   },
  // });

  const tempates = [
    {
      caption: null,
      chat_id: "ffe449d3-2a55-cc16-12d0-7f610cfa3a8d",
      created_at: 1668503186465,
      deleted: false,
      id: "d2a69b3c-2f70-d056-0153-d4506a714629",
      message_type: "TEXT",
      photo: null,
      sender_id: "9631408b-718c-46e2-9d42-49d2b09398ab",
      state: "ACTIVE",
      text: "твововововоыоыоыов ок ",
      updated_at: null,
      updated_id: 643,
    },
  ];
  const tempatesIsLoading = false;

  // const {
  //   data: tempates,
  //   isLoading: tempatesIsLoading,
  //   isError: tempatesIsError,
  // } = useGet({ link: "/message_template/list" }); ============================>>>>>>>>>>>>>>>>>>>>>>>>>

  const detail = [
    {
      created_at: 1668454041814,
      deleted: false,
      description: "срочно решить  test",
      has_own_offer: false,
      id: "6942a1d6-da57-007f-ae2e-5ff729b9f3b0",
      lawyer_id: null,
      owner_full_name: "NiginaTest",
      owner_id: "d776cfd5-e06d-4cb3-9026-ef1aba77b714",
      owner_phone_number: null,
      owner_profile_photo:
        "https://test.topyurist.uz/file/load/test/2022-11/09/i9WumlAsura.jpg",
      photos: [],
      private_phone: true,
      problem_type_id: "4b86ebd2-55f5-56a2-4414-f2d1d8a0072a",
      region_id: 1726,
      region_title: {
        us_en: "Tashkent city",
        ru_ru: "город Ташкент",
        uz_lat: "Toshkent shahri",
        uz_uz: "Тошкент шаҳри",
      },
      state: "PUBLISHED",
      updated_at: null,
      updated_id: null,
    },
  ];

  const detailIsLoading = false;

  // const {
  //   data: detail, ==============>
  //   isLoading: detailIsLoading,
  //   isError: detailIsError,
  // } = useGet({ link: "/application/info", params: { id: params.id } }); ======================>>>>>>>>>>>>>>>>>>>>>>>>>.

  const handleOpenModal = (value) => {
    modal.current.openModal(value);
  };

  const activateTemplate = (template) => {
    setActiveTemplate(template);
  };

  // const createCreateOffer = useMutate({
  //   onSuccess: () => {
  //     handleOpenModal(false);
  //     ToastSuccess(t("successfully_sent_offer"));
  //   },
  // });

  // const handleCreateOffer = () => {
  //   if (price && description) {
  //     createCreateOffer.mutate({
  //       method: "post",
  //       params: { id: params.id },
  //       link: `/application/create_offer`,
  //       body: {
  //         offer_price: price,
  //         description: description,
  //       },
  //     });
  //   } else {
  //     ToastWarning(t("please_add_price_description"));
  //   }
  // };

  const changeDescription = (value) => {
    setActiveTemplate({});
    setDescription(value);
  };

  // if (detailIsLoading) return <CustomLoader type="fixed" />;
  // if (tempatesIsError || detailIsError) return <p>Error</p>;

  const crumbs = [
    {
      title: t("services"),
      link: "/",
    },
    {
      title: prevPageTitle,
      link: `/case/${previusPageId}`,
    },
    {
      title: detail.owner_full_name,
    },
  ];

  return (
    <section className="caserequest">
      <div className="caserequest__content container">
        <Breadcumbs crumbs={crumbs} />
        <Titling title={t("request")} />

        {!detailIsLoading && (
          <div className="caserequest__body">
            <div className="caserequest__body-btn" onClick={() => navigate(-1)}>
              <img src={iconArrowback} alt="arrow" />
              <p>{t("back")}</p>
            </div>
            <div className="caserequest__body-person">
              <img
                alt="ava"
                src={detail.owner_profile_photo || iconAvatar}
                className="caserequest__person-img"
              />
              <div>
                <h3 className="caserequest__person-name">
                  {detail.owner_full_name}
                </h3>
                <p className="caserequest__person-contact">
                  +{detail.owner_phone_number}
                </p>
              </div>
            </div>
            <p className="caserequest__body-context"> {detail.description} </p>
            <div className="caserequest__body-credentials">
              {detail.region_title && (
                <div className="caserequest__body-credential">
                  <img src={iconLocation} alt="location" />
                  <p>
                    {detail.region_title[languageCombination(i18n.language)]}
                  </p>
                </div>
              )}
              <div className="caserequest__body-credential">
                <p>{new Date(detail.created_at).toLocaleDateString("en-US")}</p>
              </div>
            </div>
            {detail.length > 0 && (
              <>
                <h2 className="caserequest__body-title">Фото</h2>
                <div className="caserequest__body-images">
                  {detail.map((photo, index) => (
                    <img
                      alt="docs"
                      src={photo}
                      key={`${photo}-${index}`}
                      className="caserequest__body-img"
                    />
                  ))}
                </div>
              </>
            )}
            <div className="caserequest__body-btnholder">
              {userInfo().lawyer_state === "VERIFIED" &&
                !detail.has_own_offer && (
                  <Button
                    title={t("send_message")}
                    onClick={() => handleOpenModal(true)}
                  />
                )}
              {userInfo().lawyer_state === "VERIFIED" &&
                detail.has_own_offer && (
                  <p className="caserequest__body-text"> {t("offer_sent")} </p>
                )}
              {userInfo().lawyer_state === "UNVERIFIED" && (
                <div className="caserequest__body-action">
                  <p className="caserequest__body-desc">
                    {t("you_are_not_allowed_for_full_access")}
                  </p>
                  <Link to="/profile/verification">
                    <Button
                      className="green"
                      title={t("pass_verification")}
                      onClick={() => handleOpenModal(true)}
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal ref={modal}>
        <div className="modal__body">
          <div className="caserequest__modal-inputbox">
            <p className="caserequest__modal-title">{t("message")}</p>
            <textarea
              placeholder={t("write_text")}
              className="caserequest__modal-textarea"
              value={activeTemplate.description || description}
              onChange={(e) => changeDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="caserequest__modal-inputbox">
            <p className="caserequest__modal-title">{t("approximate_price")}</p>
            <input
              type="text"
              placeholder={t("add_price_sum")}
              className="caserequest__modal-input"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="caserequest__modal-templates">
            <div className="caserequest__templates-cap">
              <p className="caserequest__modal-title">{t("templates")}</p>
              <Link className="caserequest__modal-btn" to="/templates">
                <p>{t("all_templates")}</p>
                <img src={iconArrowback} alt="arrow" />
              </Link>
            </div>
            <div className="caserequest__modaltemplates">
              {!tempatesIsLoading ? (
                tempates.map((template) => (
                  <div
                    className={`caserequest__template ${
                      template.id === activeTemplate.id ? "current" : ""
                    }`}
                    key={template.id}
                    onClick={() => activateTemplate(template)}
                  >
                    <p> {template.description} </p>
                  </div>
                ))
              ) : (
                <CustomLoader />
              )}
            </div>
          </div>
          <Button
            title={t("send")}
            // onClick={handleCreateOffer}
          />
        </div>
      </Modal>
    </section>
  );
};

export default Index;

import React, { useTransition } from "react";
import { isLawyer, languageCombination } from "../../services/helpers";

// components
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import CustomSelect from "../../components/Selector";
import CustomLoader from "../../components/Loader";

// assets
import iconEdit from "../../assets/images/icon-edit.svg";
import iconLocationBlue from "../../assets/images/icon-location-blue.svg";
import iconPhone from "../../assets/images/icon-phone.svg";
import imageUser from "../../assets/images/header/avatar.jpg";

import uploader from "../../utils/uploader";
import AuthRequest from "../../services/requests/auth";
import { useRef } from "react";
import { useState } from "react";

const PersonalData = () => {
  const { profile_photo, full_name, region_id, username, problem_types } =
    JSON.parse(localStorage.getItem("user_info") || "{}");

  const modal = useRef(null);
  const { t, i18n } = useTransition();
  const [imageUrl, setImageUrl] = useState(profile_photo);
  const [fullName, setfullName] = useState(full_name);
  const [selectedCategory, setSelectedCategory] = useState(region_id);

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const imageUpload = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      setImageUrl(img);
    });
  };

  const handleOpenModal = (value) => {
    modal.current.openModal(value);
  };

  const userData = [{}, {}];
  const { data: region } = [{}];

  // if(userDataIsLoading) return <CustomLoader />;
  // if(userDataIsError) return <p>Error</p>

  const getUserRegion = () => {
    return region?.find((el) => el.id === userData.region.id);
  };

  const regionList = () => {
    return region?.map((item) => ({
      value: item.id,
      label: item.title[languageCombination(i18n.language)],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const bodyData = {
      profile_photo: imageUrl,
      fullName: fullName,
      region_id: selectedCategory,
      agreement: true,
      problem_types: isLawyer() ? problem_types : [],
    };
  };

  return (
    <>
      {isLawyer() && (
        <div className="pfpdata">
          <div className="pfpdata__heading">
            <div className="pfpdata__user-data">
              <img
                className="pfpdata__user-img"
                src={userData.profile_photo || imageUser}
                alt="avatar"
              />
              <div>
                <h1 className="pfpdata__user-name"> {userData.full_name} </h1>
                <p
                  className={`pfpdata__user-status ${
                    userData.lawyer_state === "VERIFIED" ? "green" : ""
                  }`}
                >
                  {userData.lawyer_state !== "VERIFIED"
                    ? t("not_verified")
                    : t("verified")}
                </p>
              </div>
            </div>
            <div className="pfpdata__heading-action">
              <button
                className="pfpdata__btn"
                onClick={() => handleOpenModal(true)}
              >
                <img src={iconEdit} alt="edit" />
              </button>
            </div>
          </div>
          <div className="pfpdata__contact">
            <p className="pfpdata__contact-item">
              <img src={iconLocationBlue} alt="location" />
              {getUserRegion()?.title[languageCombination(i18n.language)]}
            </p>
            <p className="pfpdata__contact-item">
              <img src={iconPhone} alt="phone" />
              {userData.username}
            </p>
          </div>
          <div className="pfpdata__statistics">
            <h2 className="pfpdata__statistics-title">{t("statistic")}</h2>
            <div className="pfpdata__statistics-list">
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.offer_amount}
                </span>
                <p className="pfpdata__statistic-desc">
                  {t("application_count")}
                </p>
              </div>
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.selected_amount}
                </span>
                <p className="pfpdata__statistic-desc">{t("selected")}</p>
              </div>
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.finished_applicatoin_count}
                </span>
                <p className="pfpdata__statistic-desc">{t("performed")}</p>
              </div>
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.call_count}
                </span>
                <p className="pfpdata__statistic-desc">{t("calls")}</p>
              </div>
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.customer_favorite_count}
                </span>
                <p className="pfpdata__statistic-desc">
                  {t("you_are_in_favorites")}
                </p>
              </div>
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.sent_message_count}
                </span>
                <p className="pfpdata__statistic-desc">{t("snet_message")}</p>
              </div>
              <div className="pfpdata__statistic">
                <span className="pfpdata__statistic-context">
                  {userData.received_message_count}
                </span>
                <p className="pfpdata__statistic-desc">
                  {t("incoming_message")}
                </p>
              </div>
            </div>
          </div>
          <Modal ref={modal}>
            <form className="pfpdata__modal" onSubmit={onSubmit}>
              <h1 className="pfpdata__modal-title">{t("profile")}</h1>
              <img className="pfpdata__user-img" src={imageUrl} alt="avatar" />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={imageUpload}
                style={{ display: "none" }}
              />
              <p className="pfpdata__modal-upload" onClick={handleClick}>
                {t("change_photo")}
              </p>
              <p className="pfpdata__modal-desc">{t("with_photo_title")}</p>

              <input
                className="pfpdata__modal-input"
                type="text"
                value={fullName}
                placeholder="Имя и Фамилия"
                onChange={(e) => setfullName(e.target.value)}
              />
              <CustomSelect
                className="pfpdata__modal-selector"
                options={regionList()}
                update={setSelectedCategory}
                selected={selectedCategory}
              />
              <p className="pfpdata__modal-phone">
                {t("phone_number")} : +{username}
              </p>

              <Button
                className="pfpdata__modal-btn"
                type="submit"
                title={t("save")}
              />
            </form>
          </Modal>
        </div>
      )}
      {!isLawyer() && (
        <div className="pfpdata">
          <div className="pfpdata__heading">
            <div className="pfpdata__user-data">
              <img
                className="pfpdata__user-img"
                src={userData.profile_photo || imageUser}
                alt="avatar"
              />
              <div>
                <h1 className="pfpdata__user-name">{userData.full_name}</h1>
              </div>
            </div>
            <div className="pfpdata__heading-action">
              <button
                className="pfpdata__btn"
                onClick={() => handleOpenModal(true)}
              >
                <img src={iconEdit} alt="edit" />
              </button>
            </div>
          </div>
          <div className="pfpdata__contact user">
            <p className="pfpdata__contact-item">
              <img src={iconLocationBlue} alt="location" />
              {getUserRegion()?.title[languageCombination(i18n.language)]}
            </p>
            <p className="pfpdata__contact-item">
              <img src={iconPhone} alt="phone" />
              {userData.username}
            </p>
          </div>
          <Modal ref={modal}>
            <form className="pfpdata__modal" onSubmit={onSubmit}>
              <h1 className="pfpdata__modal-title">{t("profile")}</h1>
              <img className="pfpdata__user-img" src={imageUrl} alt="avatar" />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={imageUpload}
                style={{ display: "none" }}
              />
              <p className="pfpdata__modal-upload" onClick={handleClick}>
                {t("change_photo")}
              </p>
              <p className="pfpdata__modal-desc">{t("with_photo_title")}</p>

              <input
                className="pfpdata__modal-input"
                type="text"
                value={fullName}
                placeholder={t("write_fio")}
                onChange={(e) => setfullName(e.target.value)}
              />
              <CustomSelect
                className="pfpdata__modal-selector"
                options={regionList()}
                update={setSelectedCategory}
                selected={selectedCategory}
              />
              <p className="pfpdata__modal-phone">
                {t("phone_number")}: +{username}
              </p>

              <Button
                className="pfpdata__modal-btn"
                type="submit"
                title={t("save")}
              />
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PersonalData;

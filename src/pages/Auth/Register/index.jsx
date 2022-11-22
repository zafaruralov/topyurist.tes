import { useForm, Controller } from "react-hook-form";
import React, { useRef } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import makeAnimated from "react-select/animated";
import { useState } from "react";

import AuthLayer from "../../../components/AuthLayer";
import iconUser from "../../../assets/images/icon-user.svg";
import Button from "../../../components/Button";
import { useSearchParams } from "react-router-dom";

const customStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  menuList: (base) => ({
    ...base,
    minHeight: "fit-content",
  }),
};

const customStyles2 = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "none",
    padding: "10px 25px",
  }),
};

const Index = () => {
  const [regionList, setRegionList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const hiddenFileInput = useRef(null);
  const { t } = useTranslation();
  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const role = searchParams.get("role");
  const [problemList, setProblemList] = useState([]);

  const animatedComponents = makeAnimated();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const imageUpload = (event) => {
    setIsLoading(true);
    // uploader(event).then((resp) => {
    //   const img = resp();
    //   setImageUrl(img);
    //   setValue("profile_photo", img);
    //   setIsLoading(false);
    // });
  };
  return (
    <section className="authorization">
      <div className="authorization__back">
        <div className="authorization__back-dot"></div>
      </div>
      <AuthLayer />
      <div className="authorization__form">
        <div className="authorization__form-content">
          <h1 className="authorization__title">{t("authorization")}</h1>
          <div className="authorization__registerimage">
            <div className="authorization__registerbox">
              <img
                className="authorization__registerimage-img"
                src={imageUrl ? imageUrl : iconUser}
                alt="user-img"
              />
            </div>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={imageUpload}
              style={{ display: "none" }}
            />
            <p
              className="authorization__registerimage-txt"
              onClick={handleClick}
            >
              {t("choose_photo")}
            </p>
          </div>
          <div className="authorization__inputs register">
            <input
              type="text"
              {...register("full_name", {
                required: true,
              })}
              className="authorization__inputs-input"
              placeholder={t("write_fio")}
            />
            {errors.full_name && (
              <p className="authorization__input-errortxt">{t("write_fio")}</p>
            )}
          </div>
          <div className="authorization__multiselect">
            {/* <Controller
              name="region_id"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => {
                <Select
                  {...field}
                  isMulti
                  value={field.value}
                  placeholder={t("Город/область")}
                  options={problemList}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  menuPortalTarget={document.body}
                  styles={{ ...customStyles, ...customStyles2 }}
                  className="authorization__multiselect-select"
                />;
              }}
            /> */}

            <Controller
              name="region_id"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  value={field.value}
                  placeholder={t("city_region")}
                  options={problemList}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  menuPortalTarget={document.body}
                  styles={{ ...customStyles, ...customStyles2 }}
                />
              )}
            />
            {errors.region_id && (
              <p className="authorization__input-errortxt">
                {t("choose_region")}
              </p>
            )}
          </div>

          {role === "lawyer" && (
            <div className="authorization__multiselect">
              <Controller
                name="problem_types"
                control={control}
                rules={{
                  required: true,
                  maxLength: 5,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    value={field.value}
                    placeholder={t("problem_types")}
                    options={problemList}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    menuPortalTarget={document.body}
                    styles={{ ...customStyles, ...customStyles2 }}
                    className="authorization__multiselect-select"
                  />
                )}
              />
              {errors.problem_types && (
                <p className="authorization__input-errortxt">
                  {t("choose_problem_types")}
                </p>
              )}
            </div>
          )}
          {/* <div className="authorization__agreement"></div> */}
          <Button
            className={`authorization__button ${isLoading ? "loading" : ""}`}
            title={t("save")}
            type="submit"
          />
        </div>
      </div>
    </section>
  );
};

export default Index;

import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NumberFormat, { PatternFormat } from "react-number-format";

import Button from "../../../components/Button";
import AuthLayer from "../../../components/AuthLayer";

const roles = [
  { label: "Im_lawyer", value: "lawyer" },
  { label: "Im_customer", value: "user" },
];

const Index = () => {
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const {sm}

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ phone_number }) => {
    let phone = phone_number.replace(/\D/g, "").slice(-9);
    navigate({
      pathname: "/sms",
      search: `?phone_number=${phone}&role=${role}`,
    });
  };

  return (
    <section className="authorization">
      <div className="authorization__back">
        <div className="authorization__back-dot"></div>
        <div className="authorization__back-dot"></div>
      </div>

      <AuthLayer />

      <div className="authorization__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="authorization__form-content">
            <h1 className="authorization__title">{t("authorization")}</h1>
            <ul className="authorization__tabs">
              {roles.map((el) => (
                <li
                  key={`${el.value}`}
                  onClick={() => setRole(el.value)}
                  className={`authorization__tab ${
                    el.value === role && "solid"
                  }`}
                >
                  {t(el.label)}
                </li>
              ))}
            </ul>
            <div
              className={`authorization__input ${
                errors.phone_number && "error"
              }`}
            >
              <label className="authorization__input-label">
                {t("write_phone_number")}
              </label>
              <Controller
                name="phone_number"
                control={control}
                rules={{
                  minLength: 18,
                  required: true,
                }}
                render={({ field }) => (
                  <PatternFormat
                    mask=""
                    allowEmptyFormatting
                    format="+(998)## ### ## ##"
                    placeholder="+(998)90 000-00-00"
                    onChange={(e) => field.onChange(e.target.value)}
                    className="authorization__input-input"
                  />
                )}
              />
              {errors.phone_number && (
                <p className="authorization__input-errortxt">
                  {t("write_valid_number")}
                </p>
              )}
            </div>
            <Button
              title="Login"
              onClick={handleSubmit(onSubmit)}
              className={`authorization__button ${isLoading ? "loading" : ""}`}
            />
            <div className="authorization__services">
              <span>Используя наш сервис, вы принимаете {"  "} </span>
              <a href="#!">публичную оферту</a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Index;

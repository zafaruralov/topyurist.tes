import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AuthCode from "react-auth-code-input";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthLayer from "../../../components/AuthLayer";
import Button from "../../../components/Button";
import { useState } from "react";

const Index = () => {
  const [searchParams, _] = useSearchParams();
  const [code, setCode] = useState("");
  const phone_number = searchParams.get("phone_number");
  const smsInputRef = useRef(null);
  const { t, i18n } = useTranslation();
  const userRole = searchParams.get("role");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (val) => {
    setCode(val);
    if (!isValid && val.length === 6) {
      setIsValid(true);
    }
  };
  const [counter, setCounter] = useState(20);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  useEffect(() => {
    if (!phone_number) {
      navigate(-1);
    }
  }, []);
  return (
    <section className="authorization">
      <div className="authorization__back"></div>
      <AuthLayer />
      <div className="authorization__form">
        <form className="authorization__form-content">
          <h1 className="authorization__title">{t("authorization")}</h1>
          <div className="authorization__smsblock">
            <h2 className="authorization__smsblock-title">
              {t("code_sent-to_your_number")}
            </h2>
            <p className="authorization__smsblock-num">+998 {phone_number}</p>
            <div className="authorization__smsblock-input">
              <AuthCode
                length={6}
                ref={smsInputRef}
                onChange={handleChange}
                allowedCharacters="numeric"
                containerClassName="authorization__smsblock-inputitem"
              />

              <div className="authorization__smsblock-timeoutbox">
                <p className="authorization__smsblock-timeouttxt">
                  {t("left_time")}
                </p>
                <div className="authorization__smsblock-timeouttxt">
                  {(!isValid && counter === 0) || (
                    <div>
                      <p>Осталось</p>
                      <span>00:{counter}</span>
                    </div>
                  )}
                  {!isValid && counter === 0 && (
                    <div className="authorization__smsblock-reset">
                      resend_code
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button
            title={t("send")}
            className={`authorization__button ${isLoading ? "loading" : ""}`}
          />
          <Button
            title={t("back")}
            onClick={() => navigate("/login")}
            className="secondary_authorization__button"
          />
        </form>
      </div>
    </section>
  );
};

export default Index;

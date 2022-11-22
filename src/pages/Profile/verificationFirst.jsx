import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// components
import Button from "../../components/Button";

// assets
import iconVerf from "../../assets/images/icon-sidebar-verf.svg";
import uploader from "../../utils/uploader";

const Index = () => {
  const [pageCount, setPageCount] = useState(1);
  const [formData, setFormData] = useState(null);
  const [imageDiploma, setImageDiploma] = useState("");

  const hiddenFileInput = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const diplomaUploader = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      setImageDiploma(img);
      setValue("diploma_photo", img);
    });
  };

  const onSubmit = (data) => {
    setPageCount(2);
    setFormData(data);
  };

  return pageCount === 1 ? (
    <form className="pfverf" onSubmit={handleSubmit(onSubmit)}>
      <div className="pfverf__status">
        <img className="pfverf__status-img" src={iconVerf} alt="verf" />
        <p className="pfverf__status-txt">Tasdiqlanmagan</p>
      </div>
      <div className="pfverf__heading">
        <h1 className="pfverf__title">Верификация {pageCount} из 2</h1>
        <p className="pfverf__desc">
          Заполните информацию ниже для получения полного доступа к системе
        </p>
      </div>
      <div className="pfverf__body">
        <div className="pfverf__inputbox">
          <h3 className="pfverf__title pfverf__inputbox-title">
            Общая информация
          </h3>
          <input
            className="pfverf__input"
            type="text"
            placeholder="Ваше имя или название организации"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <p className="authorization__input-errortxt">
              Введите имя или название организации
            </p>
          )}
          <textarea
            className="pfverf__textarea"
            placeholder="Коротко о деятельности и предоставляемых услугах"
            {...register("text", {
              required: true,
            })}
          ></textarea>
          {errors.text && (
            <p className="authorization__input-errortxt">
              Введите о деятельности и предоставляемых услугах
            </p>
          )}
        </div>
        <div className="pfverf__inputbox">
          <h3 className="pfverf__title pfverf__inputbox-title">
            Высшее образование*
          </h3>
          <div className="pfverf__itemblock">
            <input
              className="pfverf__input"
              type="text"
              placeholder="Название ВУЗа"
              {...register("univer_name", {
                required: true,
              })}
            />
            {errors.univer_name && (
              <p className="authorization__input-errortxt">
                Введите Название ВУЗа
              </p>
            )}
            <div className="pfverf__selectors"></div>
          </div>
        </div>
        <div className="pfverf__inputbox">
          <h3 className="pfverf__title pfverf__inputbox-title">Диплом*</h3>
          <input
            type="file"
            {...register("diploma_photo", {
              required: true,
            })}
            ref={hiddenFileInput}
            onChange={diplomaUploader}
          />

          <Button
            title="Добавить фото диплома"
            className="pfverf__addbtn secondary"
            onClick={handleClick}
          />
          {errors.diploma_photo && (
            <p className="authorization__input-errortxt">Добавьте фото</p>
          )}
          {imageDiploma && (
            <img src={imageDiploma} alt="diplomaImg" width={100} />
          )}
        </div>
      </div>
      <Button className="pfverf__btn" title="Далее" type="submit" />
    </form>
  ) : (
    <VerificationSecond
      updateCount={setPageCount}
      pageCount={pageCount}
      formData={formData}
    />
  );
};

export default Index;

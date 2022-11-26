import React, { useState, useRef } from "react";
// import { useMutate } from "hooks/query";
import { useForm } from "react-hook-form";

// components
import Button from "../../components/Button";

// assets
import iconVerf from "../../assets/images/icon-sidebar-verf.svg";
import uploader from "../../utils/uploader";

const VerificationSecond = ({ updateCount, formData, pageCount }) => {
  const [passportImg, setPassportImg] = useState("");
  const [selfieImg, setSelfieImg] = useState("");
  const [lisenceImg, setLisenceImg] = useState("");
  const [lisenceSecondImg, setLisenceSecondImg] = useState("");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const hiddenInputOne = useRef(null);
  const hiddenFileInputTwo = useRef(null);
  const hiddenFileInputThree = useRef(null);
  const hiddenFileInputFour = useRef(null);

  // const handleClickOne = () => {
  //   hiddenFileInputOne.current.click();
  // };
  const handleClickTwo = () => {
    hiddenFileInputTwo.current.click();
  };
  const handleClickThree = () => {
    hiddenFileInputThree.current.click();
  };
  const handleClickFour = () => {
    hiddenFileInputFour.current.click();
  };

  const passportUploader = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      setPassportImg(img);
      setValue("passport_photo", img);
    });
  };

  const selfieUploader = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      setSelfieImg(img);
      setValue("selfie_photo", img);
    });
  };

  const lisenceUploader = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      setLisenceImg(img);
      setValue("license_photo", img);
    });
  };

  const lisenceUploaderSecond = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      setLisenceSecondImg(img);
      setValue("license_second_photo", img);
    });
  };

  // const varificationForm = useMutate({
  //   onSuccess: (resp) => {},
  // });

  const onSubmit = (data) => {
    const {
      passport_photo,
      selfie_photo,
      license_photo,
      license_second_photo,
      agreement,
    } = data;

    const bodyData = {
      title: formData.name,
      description: formData.text,
      diploma_photo: formData.diploma_photo,
      passport_front_photo: passport_photo,
      passport_back_photo: selfie_photo,
      license_photo,
      civil_license_photo: license_second_photo,
      studies: [
        {
          id: null,
          title: formData.univer_name,
          sort: null,
          start_at: "2022-01-01",
          and_at: null,
        },
      ],
    };
  };

  return <div>VerificationSecond</div>;
};

export default VerificationSecond;

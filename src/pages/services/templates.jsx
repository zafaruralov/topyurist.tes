import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// сomponents
import Button from "../../components/Button";
import Breadcumbs from "../../components/Breadcumbs";
import CustomLoader from "../../components/Loader";
import { ToastSuccess } from "../../components/Toast";

// assets
import iconModalclose from "../../assets/images/icon-modalclose.svg";
import iconEdit from "../../assets/images/icon-edit.svg";
import iconTrash from "../../assets/images/icon-trash-red.svg";
import { ToastError } from "../../components/Toast";

const Templates = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [actionData, setActionData] = useState({});
  const [isModalOpen, isModalClosed] = useState(false);

  // const { data, isLoading, isError, refetch } = useGet({ =========>
  //   link: "/message_template/list",
  // });

  // const createTemplate = useMutate({
  //   onSuccess: () => {
  //     refetch();
  //     toggleModal();
  //     setActionData({});
  //     ToastSuccess(t("template_created"));
  //   },
  // });

  // const updateTemplate = useMutate({
  //   onSuccess: () => {
  //     refetch();
  //     toggleModal();
  //     setActionData({});
  //     ToastSuccess(t("template_created"));
  //   },
  // });

  const data = []

  // const deleteTemplate = useMutate({
  //   onSuccess: () => {
  //     refetch();
  //     ToastError("Template deleted successfully");
  //   },
  // });

  // if (isLoading) return <CustomLoader type="fixed" />;
  // if (isError) return <p>Error</p>;

  // const toggleModal = () => {
  //   setIsModalOpen((prev) => !prev);
  //   setValue("");
  // };

  const crumbs = [
    {
      title: t("services"),
      link: "/",
    },
    {
      title:t("templates"),
      link: `/templates`,
    },
  ];

  // const saveTemplate = () => {
  //   if (Object.keys(actionData).length) {
  //     updateTemplate.mutate({
  //       method: "put",
  //       body: { description: value },
  //       link: `/message_template/update?id=${actionData.id}`,
  //     });
  //   } else {
  //     createTemplate.mutate({
  //       link: "/message_template/create",
  //       body: { description: value },
  //       method: "post",
  //     });
  //   }
  // };

  // const handleUpdate = (element) => {
  //   setActionData(element);
  //   setValue(element.description);
  //   setIsModalOpen(true);
  // };

  // const handleDelete = ({ id }) => {
  //   if (id) {
  //     deleteTemplate.mutate({
  //       method: "delete",
  //       link: `/message_template/delete?id=${id}`,
  //     });
  //   }
  // };

  return (
    <section className="services">
      <div className="services__content container">
        <Breadcumbs crumbs={crumbs} />

        <div className="services__titling">
          <h1 className="services__titling-title">{t("templates")}</h1>
          <div className="services__titling-action">
            <div className="services__categories">
              <button
                className="services__btn services__categories-toggler"
                // onClick={toggleModal}
              >
                <p>{t("add_templates")}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="templates">
          {data.map((el) => (
            <div className="templates__item" key={el.id}>
              <p className="templates__item-text">{el.description}</p>
              <div className="templates__item-btn">
                <span></span>
                <span></span>
                <span></span>

                <div className="templates__action">
                  <div
                    className="templates__action-item"
                    // onClick={() => handleUpdate(el)}
                  >
                    <img src={iconEdit} alt="icon" />
                    <p>{t("update")} </p>
                  </div>
                  <div
                    className="templates__action-item delete"
                    // onClick={() => handleDelete(el)}
                  >
                    <img src={iconTrash} alt="icon" />
                    <p>{t("delete")} </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`modal ${isModalOpen && "opened"} `}>
        <div className="caserequest__modal">
          <div className="modal__content">
            <div className="modal__body">
              <p className="caserequest__modal-title">{t("new_template")}</p>
              <textarea
                value={value}
                className="caserequest__modal-textarea mb"
                placeholder={t("write_text")}
                onChange={(e) => setValue(e.target.value)}
              ></textarea>

              {/* {updateTemplate.isLoading || createTemplate.isLoading ? ( */}
                <Button title="Loading..." />
               : (
                <Button
                  title={
                    Object.keys(actionData).length ? t("update") : t("send")
                  }
                  // onClick={saveTemplate}
                />
              )
            </div>
            <button className="modal__close" 
            // onClick={toggleModal}
            >
              <img src={iconModalclose} alt="modalclose" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;

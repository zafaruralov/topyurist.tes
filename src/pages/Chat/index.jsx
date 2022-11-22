import React, { useRef, useState, useCallback } from "react";
import { isLawyer } from "../../services/helpers";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// // componenets
import { ToastWarning, ToastSuccess } from "../../components/Toast";
import Tabs from "../../components/Tabs";
import Titling from "../../components/Titling";
import Button from "../../components/Button";
import PersonCard from "../../components/Personcard";
import { checkAmount, msToTime, userInfo } from "../../services/helpers";
import Modal from "../../components/Modal";
import TextMessage from "./textMessage";
import ImageMessage from "./imageMessage";
import PriceMessage from "./priceMessage";
import uploader from "../../utils/uploader";
import CustomLoader from "../../components/Loader";

// assets
import iconAvatar from "../../assets/images/icon-useravatar.svg";
import iconAttach from "../../assets/images/icon-attach.svg";
import iconArrow from "../../assets/images/icon-arrowblue.svg";
import iconSend from "../../assets/images/icon-send.svg";
import { t } from "i18next";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state");

  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("");
  const [chatList, setChatList] = useState([]);
  const [messagePage, setMessagepage] = useState([]);
  const [messageId, setMessageId] = useState(null);
  const [activeChat, setActiveChat] = useState({});
  const [messageValue, setMessageValue] = useState("");
  const [isMobileOpen, setisMobileOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState({});
  const [isSolved, setIsSolved] = useState("application_solved");

  const [filter, setFilter] = useState(state || "all");

  const messagesList = useRef(null);
  const inputFileRef = useRef(null);

  const requestModal = useRef(null);
  const templatesModal = useRef(null);
  const priceChangeModal = useRef(null);

  const tabs = [
    {
      title: "all",
      isSelected: filter === "all",
      value: "all",
    },
    {
      title: "in_progress",
      isSelected: state === "IN_PROGERSS",
      value: "IN_PROGERSS",
    },
    {
      title: "finished",
      isSelected: state === "FINISHED",
      value: "FINISHED",
    },
  ];

  const changeTab = (tab) => {
    setFilter(tab.value);
  };

  const handleRequestCloseModal = (value) => {
    requestModal.current.openModal(value);
  };
  const handleTemplatesModal = (value) => {
    templatesModal.current.openModal(value);
  };
  const handlePriceChangeModal = (value) => {
    priceChangeModal.current.openModal(value);
  };

  const replaceUrlQuery = () => {
    let query = {};
    if (filter !== "all") query.state = filter;

    setSearchParams(query);
  };

  const handleChange = (e) => {
    let element = e.target;
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
    setMessageValue(e.target.value);
  };

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
  const tempatesIsLoading = [false];
  // const {
  //   data: tempates,
  //   isLoading: tempatesIsLoading,
  //   isError: tempatesIsError,
  // } = useGet({ link: "/message_template/list" }); =====================>

  // const {
  //   data: chat,
  //   isLoading: chatIsLoading,
  //   isError: chatIsError,
  //   refetch: chatRefetch,
  // } = useGet({
  //   link: "/chat/page",
  //   refetchInterval: 15000,
  //   params: {
  //     state: filter === "all" ? undefined : filter.toUpperCase(),
  //   },
  //   onSuccess: (res) => {
  //     // replaceUrlQuery();
  //     res.data.length === 0 && navigate("/chatempty");
  //     setChatList(res.data);
  //   },
  // });

  const message = [
    {
      applicatioin_selected_offer: true,
      application_id: "e6f083be-af31-04e0-9596-8ad757846761",
      application_state: "IN_PROGRESS",
      dialog_phone: "+998994400583",
      dialog_user_name: "Бахромджон",
      dialog_user_photo:
        "https://test.topyurist.uz/file/load/test/2022-11/09/YIELNJVcNW7.jpg",
      id: "ffe449d3-2a55-cc16-12d0-7f610cfa3a8d",
      last_message: "твововововоыоыоыов ок ",
      last_message_at: 1668503186465,
      last_updated_id: 644,
      offer_id: "ffb88933-cec6-a993-673f-90937408aedf",
      offer_state: "ACTIVE",
      unread_count: 0,
    },
  ];

  // const {
  // data: message, ------------->
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGet({
  // link: "/chat/message_page", // ----------->
  //   params: { chat_id: messageId, page: 1 },
  //   enabled: !!messageId,
  //   refetchInterval: 5000,
  //   onSuccess: (res) => {
  //     chatRefetch();
  //     setTimeout(() => scrollDown(), 50);
  //     setMessagepage(res.data.reverse());
  //   },
  // });

  // const createMessage = useMutate({
  //   onSuccess: () => {
  //     refetch();
  //     setMessageValue("");
  //     ToastSuccess(t("send_message"));
  //   },
  // });

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   createMessage.mutate({
  //     method: "post",
  //     link: `/chat/create_message?id=${messageId}`,
  //     body: { message_type: "TEXT", text: messageValue },
  //   });
  // };

  // const solveApplication = useMutate({
  //   onSuccess: () => {
  //     handleRequestCloseModal(false);
  //     setActiveChat((init) => ({ ...init, application_state: "FINISHED" }));
  //   },
  // });

  // const handleSolveApplication = () => {
  //   if (reason) {
  //     solveApplication.mutate({
  //       method: "patch",
  //       body: { reason },
  //       link: `/offer/${isSolved}?offer_id=${activeChat.offer_id}`,
  //     });
  //   } else {
  //     ToastWarning("Please fill description");
  //   }
  // };

  // const selectLawyerApi = useMutate({
  //   onSuccess: () => {
  //     setActiveChat((init) => ({ ...init, applicatioin_selected_offer: true }));
  //   },
  // });

  // const selectLawyer = () => {
  //   selectLawyerApi.mutate({
  //     method: "patch",
  //     link: `/offer/select_lawyer?offer_id=${activeChat.offer_id}`,
  //   });
  // };

  // const changePrice = useMutate({
  //   onSuccess: () => {
  //     setPrice("");
  //     handlePriceChangeModal(false);
  //     ToastSuccess(t("price_changed"));
  //   },
  // });

  // const savePrice = () => {
  //   changePrice.mutate({
  //     method: "patch",
  //     body: { offer_price: price },
  //     link: `/offer/lawyer_change_price?offer_id=${activeChat.offer_id}`,
  //   });
  // };

  // const getOneMessage = useCallback(
  //   (page) => {
  //     setMessageId(page.id);
  //     setActiveChat(page);
  //     openConversation();
  //     setTimeout(() => {
  //       refetch();
  //     }, 0);
  //   },
  //   [messageId]
  // );

  const openConversation = () => {
    setisMobileOpen(true);
  };
  const closeConversation = () => {
    setisMobileOpen(false);
  };

  const saveSelectedTemplate = () => {
    handleTemplatesModal(false);
    setMessageValue(activeTemplate.description);
  };

  const scrollDown = () => {
    messagesList.current.scrollTop = messagesList.current.scrollHeight;
  };

  // const onFileChangeCapture = (event) => {
  //   uploader(event).then((resp) => {
  //     const img = resp();
  //     createMessage.mutate({
  //       method: "post",
  //       link: `/chat/create_message?id=${messageId}`,
  //       body: { message_type: "PHOTO", photo: img, caption: "test image" },
  //     });
  //   });
  // };

  const onBtnClick = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const sendPhoneNumber = () => {
    const phoneNumber = "+" + userInfo().username;
    // createMessage.mutate({
    //   method: "post",
    //   link: `/chat/create_message?id=${messageId}`,
    //   body: { message_type: "TEXT", text: phoneNumber },
    // });
  };

  // if (chatIsLoading) return <CustomLoader type="fixed" />;
  // if (chatIsError || isError || tempatesIsError) return <p>Error</p>;

  return (
    <section className={`chat ${isMobileOpen && "mobileopened"}`}>
      <div className="chat__content container">
        <Titling title={t("chats")} />
        <Tabs tabitems={tabs} changeTab={changeTab} />
        <div className="chat__body">
          <div className="chat__body-header">
            {message && (
              <>
                <PersonCard info={activeChat} />
                <p className="chat__body-header-status">{t("in_progress")}</p>
              </>
            )}
          </div>
          <div className="chat__body-chats">
            {chatList.length > 0 &&
              chatList.map((el, index) => (
                <div
                  className="chat__item"
                  // onClick={() => getOneMessage(el)}
                  key={`${el.id}-${index}`}
                >
                  <img
                    className="chat__item-img"
                    src={el.dialog_user_photo || iconAvatar}
                    alt=""
                  />
                  <div>
                    <h3 className="chat__item-name">{el.dialog_user_name}</h3>
                    <p className="chat__item-txt">{el.last_message}</p>
                  </div>
                  <div className="chat__item-stats">
                    <p className="chat__item-time">{msToTime(el.created_at)}</p>
                    {!!el.unread_count && (
                      <span className="chat__item-count">
                        {checkAmount(el.unread_count, "100")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {message && (
            <div className="chat__body-main">
              <div
                className="chat__conversation-backbtn"
                onClick={closeConversation}
              ></div>
              {/* <h3 className="chat__conversation-title">17.07.2022</h3> */}
              <div
                ref={messagesList}
                className="chat__conversation-messages left"
              >
                <div className="chat__conversation-messages-list">
                  {messagePage.length &&
                    messagePage.map((el, index) => (
                      <React.Fragment key={`${el.id}-${index}`}>
                        {el.message_type === "TEXT" && (
                          <TextMessage
                            text={el.text}
                            time={el.created_at}
                            position={
                              userInfo().id === el.sender_id ? "" : "left"
                            }
                          />
                        )}
                        {el.message_type === "PHOTO" && (
                          <ImageMessage
                            link={el.photo}
                            time={el.created_at}
                            position={
                              userInfo().id === el.sender_id ? "" : "left"
                            }
                          />
                        )}
                        {el.message_type === "PRICE" && (
                          <PriceMessage
                            text={el.text}
                            time={el.created_at}
                            position={
                              userInfo().id === el.sender_id ? "" : "left"
                            }
                          />
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
              {isLawyer() ? (
                <div className="chat__conversation-actions">
                  <Button
                    className="rounded lightblue"
                    title={t("templates")}
                    onClick={() => handleTemplatesModal(true)}
                  />
                  <Button
                    className="rounded lightblue"
                    title={t("change_price")}
                    onClick={() => handlePriceChangeModal(true)}
                  />
                </div>
              ) : (
                <div className="chat__conversation-actions">
                  {activeChat.applicatioin_selected_offer &&
                    activeChat.application_state !== "FINISHED" && (
                      <Button
                        className="rounded red"
                        title={t("close_request")}
                        onClick={() => handleRequestCloseModal(true)}
                      />
                    )}
                  {!activeChat.applicatioin_selected_offer && (
                    <Button
                      className="rounded blue"
                      title={t("choose_lawyer")}
                      // onClick={selectLawyer}
                    />
                  )}
                  <Button
                    className="rounded lightblue"
                    title={t("send_number")}
                    onClick={sendPhoneNumber}
                  />
                </div>
              )}
              <div className="chat__conversation-writer">
                <form>
                  <input
                    type="file"
                    ref={inputFileRef}
                    style={{ display: "none" }}
                    // onChangeCapture={onFileChangeCapture}
                  />
                  <button
                    className="chat__conversation-writerbtn"
                    onClick={onBtnClick}
                  >
                    <img src={iconAttach} alt="" />
                  </button>
                </form>
                <textarea
                  value={messageValue}
                  onChange={(e) => handleChange(e)}
                  className="chat__conversation-textarea"
                ></textarea>
                <button
                  className="chat__conversation-writerbtn"
                  // onClick={sendMessage}
                >
                  <img src={iconSend} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="modals">
        {isLawyer() ? (
          <>
            <Modal ref={templatesModal}>
              <div className="modal__shorttitling">
                <h1 className="modal__shorttitling-title">{t("templates")}</h1>
                <Link className="modal__shorttitling-link" to="/templates">
                  <p>{t("all_templates")}</p>
                  <img src={iconArrow} alt="arrow" />
                </Link>
              </div>
              <div className="chat__modal-templates">
                {!tempatesIsLoading ? (
                  tempates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setActiveTemplate(template)}
                      className={`chat__modal-template ${
                        template.id === activeTemplate.id ? "current" : ""
                      }`}
                    >
                      <p> {template.description} </p>
                    </div>
                  ))
                ) : (
                  <CustomLoader />
                )}
              </div>
              <Button title={t("save")} onClick={saveSelectedTemplate} />
            </Modal>
            <Modal ref={priceChangeModal}>
              <div className="modal__shorttitling">
                <h1 className="modal__shorttitling-title">
                  {t("approximate_price")}
                </h1>
              </div>
              <input
                type="text"
                className="modal__input chat__modal-input"
                placeholder={t("add_price_sum")}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button
                title={t("save")}
                // onClick={savePrice}
              />
            </Modal>
          </>
        ) : (
          <Modal ref={requestModal}>
            <div className="modal__shorttitling">
              <h1 className="modal__shorttitling-title">
                {t("write_comment")}
              </h1>
            </div>
            <div className="chat__modal-action">
              <Button
                className={`rounded ${
                  isSolved === "application_solved" ? "blue" : "lightblue"
                }`}
                title="Решено"
                onClick={() => setIsSolved("application_solved")}
              />
              <Button
                className={`rounded ${
                  isSolved === "rejected" ? "blue" : "lightblue"
                }`}
                title="Не решено"
                onClick={() => setIsSolved("rejected")}
              />
            </div>
            <textarea
              className="chat__modal-textarea modal__textarea"
              placeholder="Введите комментарий"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Button
              title={t("send")}
              //  onClick={handleSolveApplication}
            />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default Index;

import React, { useRef, useState, useEffect } from "react";
// import { useGet, useMutate } from "hooks/query";
import { useTranslation } from "react-i18next";

import { userInfo } from "../../services/helpers";
import TextMessage from "../Chat/textMessage";
import ImageMessage from "../Chat/imageMessage";

// componenets
import Titling from "../../components/Titling";
import uploader from "../../utils/uploader";

// assets
import iconAttach from "../../assets/images/icon-attach.svg";
import iconSend from "../../assets/images/icon-send.svg";
import { ToastSuccess } from "../../components/Toast";

const Index = () => {
  const { t } = useTranslation();

  const messagesList = useRef(null);
  const [messageValue, setMessageValue] = useState("");
  const [messagePage, setMessagepage] = useState([]);

  const inputFileRef = useRef(null);

  const onBtnClick = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const handleChange = (e) => {
    let element = e.target;
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
    setMessageValue(e.target.value);
  };

  // const {
  //   data: message,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGet({
  //   link: "/profile/support/chat/page",
  //   refetchInterval: 5000,
  //   onSuccess: () => setTimeout(() => scrollDown(), 50),
  // });

  useEffect(() => {
    if (!isLoading && !isError) {
      setMessagepage(message?.data.reverse());
    }
  }, [message]);

  const scrollDown = () => {
    messagesList.current.scrollTop = messagesList.current.scrollHeight;
  };

  // const createMessage = useMutate({
  //   onSuccess: () => {
  //     refetch();
  //     setMessageValue("");
  //     ToastSuccess(t("send_message"));
  //   },
  // });

  const sendMessage = (e) => {
    e.preventDefault();
    createMessage.mutate({
      method: "post",
      link: `/profile/support/chat/message`,
      body: { message_type: "TEXT", text: messageValue },
    });
  };

  const onFileChangeCapture = (event) => {
    uploader(event).then((resp) => {
      const img = resp();
      createMessage.mutate({
        method: "post",
        link: `/profile/support/chat/message`,
        body: { message_type: "PHOTO", photo: img, caption: "test image" },
      });
    });
  };

  return (
    <div className="support">
      <div className="support__content">
        <Titling title={t("support_chat")} />
        <div className="support__body">
          <div className="support__chat-header"></div>
          <div className="support__chat-body">
            <div ref={messagesList} className="support__chat-messages left">
              <div className="support__chat-messages-list">
                {messagePage.length > 0 &&
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
                          time={el.created_at}
                          link={el.photo}
                          position={
                            userInfo().id === el.sender_id ? "" : "left"
                          }
                        />
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
            <div className="support__chat-writer chat__conversation-writer">
              <form>
                <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: "none" }}
                  onChangeCapture={onFileChangeCapture}
                />
                <button
                  className="chat__conversation-writerbtn"
                  onClick={onBtnClick}
                >
                  <img src={iconAttach} alt="" />
                </button>
              </form>
              <textarea
                placeholder="text"
                value={messageValue}
                onChange={(e) => handleChange(e)}
                className="chat__conversation-textarea"
              ></textarea>
              <button
                className="chat__conversation-writerbtn"
                onClick={sendMessage}
              >
                <img src={iconSend} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

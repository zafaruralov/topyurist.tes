import React from "react";

// components
import Titling from "../../components/Titling";

// assets
import errorChat from "../../assets/images/chats/error-empty.svg";

const index = () => {
  return (
    <section className="emptyblock">
      <div className="emptyblock__content container">
        <Titling title="Чаты" />

        <div className="emptyblock__body">
          <p className="emptyblock__body-title">Пусто</p>
          <img className="emptyblock__body-img" src={errorChat} alt="icon" />
          <p className="emptyblock__body-desc">
            На данный момент нет активных чатов
          </p>
        </div>
      </div>
    </section>
  );
};

export default index;

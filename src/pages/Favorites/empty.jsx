import React from "react";

// componenets
import Titling from "../../components/Titling";

// assets
import errorFav from "../../assets/images/favourite/error-favourite.svg";

const index = () => {
  return (
    <section className="emptyblock">
      <div className="emptyblock__content container">
        <Titling title="Избранное" />
        <div className="emptyblock__body">
          <p className="emptyblock__body-title">Ничего нет</p>
          <img className="emptyblock__body-img" src={errorFav} alt="icon" />
          <p className="emptyblock__body-desc">
            На данный момент вы ничего не добавили
          </p>
        </div>
      </div>
    </section>
  );
};
export default index;

import React from "react";
import { msToTime } from "../../services/helpers";
import IconPriceImg from "../../assets/images/Icon-price.svg";

const PriceMessage = ({ text, time, position }) => {
  return (
    <div className={`chat__message ${position}`}>
      <div className="price_message">
        <img src={IconPriceImg} alt="IconPriceImg" />
        <p> {text} </p>
      </div>
      <span> {msToTime(time)} </span>
    </div>
  );
};

export default PriceMessage;

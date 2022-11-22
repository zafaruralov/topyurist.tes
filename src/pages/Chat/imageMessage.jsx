import React from "react";
import { msToTime } from "../../services/helpers";

const ImageMessage = ({ link, position, time }) => {
  return (
    <div className={`chat__message image-message ${position}`}>
      <img src={link} alt="imagechat" />
      <span> {msToTime(time)} </span>
    </div>
  );
};

export default ImageMessage;

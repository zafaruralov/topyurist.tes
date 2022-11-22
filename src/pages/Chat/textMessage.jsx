import React from "react";
import { msToTime } from "../../services/helpers";

const textMessage = ({ text, time, position }) => {
  return (
    <div className={`chat__message ${position}`}>
      <p>{text}</p>
      <span> {msToTime(time)} </span>
    </div>
  );
};

export default textMessage;

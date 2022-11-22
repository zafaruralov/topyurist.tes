import React, { useState } from "react";

import iconArrow from "../../assets/images/icon-arrow.svg";

function Index({ title, options, update, selected, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const label = selected
    ? options?.find((el) => el.value === selected).label
    : title;

  return (
    <div className={`selector ${className} ${isOpen && "opened"}`}>
      <div className="selector__holder">
        <div className="selector__toggler" onClick={toggleSelect}>
          <p> {label} </p>
          <span className="selector__toggler-arrow">
            <img src={iconArrow} alt="" />
          </span>
        </div>
        <div className="selector__context">
          <ul>
            {options?.length > 0 &&
              options.map((option, i) => (
                <li
                  onClick={() => {
                    update(option.value);
                    setIsOpen(false);
                  }}
                  className={`selector__element ${
                    option.value === selected && "current"
                  } ${option.disabled && "disabled"}`}
                  key={`${option.label}-${i}`}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Index;

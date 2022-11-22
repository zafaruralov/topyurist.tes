import React, { forwardRef, useImperativeHandle, useState } from "react";

import iconModalclose from "../../assets/images/icon-modalclose.svg";

const Index = ({ children, close = () => {} }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (value) => setIsModalOpen(value),
  }));

  const handleCloser = () => {
    close(null);
    setIsModalOpen(false);
  };

  return (
    <div className={`modal ${isModalOpen && "opened"}`}>
      <div className="caserequest__modal">
        <div className="modal__content">
          {children}
          <button className="modal__close" onClick={handleCloser}>
            <img src={iconModalclose} alt="modalclose" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Index);

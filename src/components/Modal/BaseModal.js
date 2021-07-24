import React from "react";

const BaseModal = ({ children, closeModal }) => {
  return (
    <div onClick={() => closeModal()}>
      <div className="modal">
        <div
          style={{
            background: "white",
            minWidth: "400px",
            maxWidth: "80%",
            margin: "auto",
            minHeight: "200px",
            padding: "20px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="close" onClick={() => closeModal()}>
            &times;
          </span>
          <div style={{ paddingTop: "30px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;

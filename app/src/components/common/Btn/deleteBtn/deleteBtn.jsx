import React from "react";
import "./deleteBtn.css"; // CSS版

const DeleteButton = ({ children, onClick }) => {
  return (
    <button className="common-delete-button" onClick={onClick}>
        {children}
    </button>
  );
};

export default DeleteButton;

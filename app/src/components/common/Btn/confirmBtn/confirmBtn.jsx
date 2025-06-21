import * as React from "react";
import "./ConfirmBtn.css";

const ConfirmButton = ({ onClick, children = "決定", className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`confirm-button ${disabled ? "disabled" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;

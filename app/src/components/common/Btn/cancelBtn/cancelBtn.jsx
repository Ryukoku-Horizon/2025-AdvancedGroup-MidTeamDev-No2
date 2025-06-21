import * as React from "react";
import "./CancelBtn.css";

const CancelButton = ({ onClick, children = "キャンセル", className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cancel-button ${disabled ? "disabled" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default CancelButton;

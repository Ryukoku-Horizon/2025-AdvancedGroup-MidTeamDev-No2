import * as React from "react";
import "./CancelBtn.css";

type Props={
  onClick:()=>void;
  children:JSX.Element | string;
  className:string;
  disabled:boolean;
}

const CancelButton = ({ onClick, children = "キャンセル", className = "", disabled = false }:Props) => {
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

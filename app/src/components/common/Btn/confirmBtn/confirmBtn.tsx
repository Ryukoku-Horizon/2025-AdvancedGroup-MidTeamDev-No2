import * as React from "react";
import "./ConfirmBtn.css";

type Props={
  onClick:()=>void;
  children?:JSX.Element | string;
  className?:string;
  disabled?:boolean;
}


const ConfirmButton = ({ onClick, children = "決定", className = "", disabled = false }:Props) => {
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

import * as React from "react";
import "./cancelBtn.css";

type Props={
  onClick:()=>void;
  children?:React.ReactNode;
  className?:string;
  disabled?:boolean;
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

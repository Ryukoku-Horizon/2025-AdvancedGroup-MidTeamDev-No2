import * as React from "react";
import "./ConfirmBtn.css";

type Props={
  onClick:React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?:React.ReactNode;
  className?:string;
}

const ConfirmButton = ({ onClick, children, className}:Props) => {
  return (
    <button
      onClick={onClick}
      className={`confirm-button ${className}`}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;

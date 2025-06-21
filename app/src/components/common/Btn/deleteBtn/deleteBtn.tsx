import React from "react";
import "./deleteBtn.css"; 

type Props={
  onClick:()=>void;
  children:JSX.Element | string;
}


const DeleteButton = ({ children, onClick }:Props) => {
  return (
    <button className="common-delete-button" onClick={onClick}>
        {children}
    </button>
  );
};

export default DeleteButton;

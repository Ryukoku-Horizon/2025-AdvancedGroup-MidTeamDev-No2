import * as React from "react";
import "./deleteBtn.css"; 

type Props={
  onClick:()=>void;
  children?:React.ReactNode;
}


const DeleteButton = ({ children, onClick }:Props) => {
  return (
    <button className="common-delete-button" onClick={onClick}>
        {children}
    </button>
  );
};

export default DeleteButton;

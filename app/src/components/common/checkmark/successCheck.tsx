import React from "react";
import Lottie from "lottie-react";
import checkAnimation from "./successCheck.json"; 

type Props={
  size:number;
}

const SuccessCheck = ({ size = 56 }:Props) => {
  return (
    <div style={{ width: size, height: size }}>
      <Lottie animationData={checkAnimation} loop={false} />
    </div>
  );
};

export default SuccessCheck;
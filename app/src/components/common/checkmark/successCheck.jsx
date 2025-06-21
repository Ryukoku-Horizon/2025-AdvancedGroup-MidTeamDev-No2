import * as React from "react";
import Lottie from "lottie-react";
import checkAnimation from "./successCheck.json"; 

const SuccessCheck = ({ size = 56 }) => {

  return (
    <div style={{ width: size, height: size }}>
      <Lottie animationData={checkAnimation} loop={false} />
    </div>
  );
};

export default SuccessCheck;
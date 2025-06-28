import Lottie from "lottie-react";
import * as checkAnimation from "./successCheck.json"; 

const SuccessCheck = ({ size = 56 }) => {

  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center w-full">
      <Lottie animationData={checkAnimation} loop={false} />
    </div>
  );
};

export default SuccessCheck;
import Lottie from "lottie-react"
import * as loadingText from "./loadingText.json"; 

const LoadingText=({size}:{size:number})=>{
    return (
        <div style={{ width: size, height: size }}>
            <Lottie animationData={loadingText} size={56} loop={true} />
        </div>
    )
}

export default LoadingText;
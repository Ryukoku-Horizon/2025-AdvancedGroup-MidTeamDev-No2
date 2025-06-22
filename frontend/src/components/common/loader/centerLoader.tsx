import { ClipLoader } from "react-spinners";
import LoadingText from "./loadingText";

const CenterLoader=()=>{
    return (
        <div className="flex-1 flex flex-col h-full items-center justify-center">
            <ClipLoader color="#36d7b7" size={120} />
            <LoadingText size={120} />
        </div>
    )
}

export default CenterLoader;
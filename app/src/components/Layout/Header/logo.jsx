import * as React from "react"
import appIcon from "../../../images/app_icon.png";
import { Link } from "gatsby";

const Logo=()=>{
    return (
        <Link to="/" className="p-0 m-0 decoration-none self-center">
            <div className="flex-1 flex items-center gap-1 m-0 p-0">
                <img src={appIcon} alt="icon" className="w-5 h-5" />
                <p className="font-l gray-5 m-0 bold">龍谷サークルHub</p>
            </div>
        </Link>
    )
}

export default Logo;
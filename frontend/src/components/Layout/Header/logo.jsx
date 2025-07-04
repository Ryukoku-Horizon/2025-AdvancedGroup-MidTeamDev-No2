import { Link } from "react-router-dom";

const Logo=()=>{
    const env = process.env.REACT_APP_URL ?? ""

    return (
        <Link to={`${env}/`} className="p-0 m-0 decoration-none self-center">
            <div className="flex-1 flex items-center gap-1 m-0 p-0">
                <img src={`${env}/app_icon.png`} alt="icon" className="w-5 h-5" />
                <p className="font-l gray-5 m-0 bold">龍谷サークルHub</p>
            </div>
        </Link>
    )
}

export default Logo;
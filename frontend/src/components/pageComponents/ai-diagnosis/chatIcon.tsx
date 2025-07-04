import { IoPersonCircleOutline } from "react-icons/io5";

type Props={
    speaker:"ai" | "user";
}

const ChatIcon=({speaker}:Props)=>{
    return (
        <div className="flex flex-col gap-0 p-0 m-0 relative b-2 items-center">
            <p className="m-0 font-s relative t-1 gray-6">{speaker==="ai" ? "AI" : "あなた"}</p>
            {speaker==="ai" && <img src="/app_icon.png" className="radius-full h-7 w-7 p-0 m-0" />}
            {/* @ts-ignore */}
            {speaker==="user" && <IoPersonCircleOutline color="skyblue" size={45} />}
        </div>
    )
}

export default ChatIcon;
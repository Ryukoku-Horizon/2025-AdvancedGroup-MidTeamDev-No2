import { useEffect, useState } from "react"
import { Chat } from "../../../types/chat"
import { QnAs } from "../../../constants/qna";
import ChatItem from "./chatItem";
import useDiagnosis from "../../../hooks/useDiagosis";

type Props={
    isStarted:boolean;
}

const ChatField =({isStarted}:Props)=>{
    const {chatList,loading,setQnAInChat,response} = useDiagnosis(isStarted)

    return (
        <div className="w-full">
            {chatList.map((item)=>(
                <ChatItem chat={item} response={response} />
            ))}
        </div>
    )
}

export default ChatField;
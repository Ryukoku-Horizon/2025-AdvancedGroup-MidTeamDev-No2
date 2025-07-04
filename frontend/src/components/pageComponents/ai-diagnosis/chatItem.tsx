import { Chat } from "../../../types/chat"
import ChatBubble from "./chatBubble"
import ChatIcon from "./chatIcon"

type Props={
    chat:Chat
    response: (res: string) =>Promise<void>;
}

const ChatItem=({chat,response}:Props)=>{
    if(chat.type!=="input")
    return (
        <div className={`flex ${chat.speaker==="ai" ? "justify-start" : "justify-end"}`}>
            {chat.speaker==="ai" && <ChatIcon speaker={chat.speaker} />}
            <ChatBubble chat={chat} response={response} />
            {chat.speaker==="user" && <ChatIcon speaker={chat.speaker} />}
        </div>
    )

    return <div></div>
}

export default ChatItem;
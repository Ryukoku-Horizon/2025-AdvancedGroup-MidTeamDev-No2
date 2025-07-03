import { Chat } from "../../../types/chat"
import ChatBubble from "./chatBubble"
import ChatIcon from "./chatIcon"

type Props={
    chat:Chat
    response: (res: string) => void;
}

const ChatItem=({chat,response}:Props)=>{
    return (
        <div className={`flex ${chat.speaker==="ai" ? "justify-start" : "justify-end"}`}>
            {chat.speaker==="ai" && <ChatIcon />}
            <ChatBubble chat={chat} response={response} />
            {chat.speaker==="user" && <ChatIcon />}
        </div>
    )
}

export default ChatItem;
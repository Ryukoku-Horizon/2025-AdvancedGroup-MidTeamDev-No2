import { useState } from "react";
import { Chat } from "../../../types/chat"

type Props={
    chat:Chat;
    response: (res: string) => void;
}

const ChatBubble=({chat,response}:Props)=>{
    const direction = chat.speaker==="user" ? "right" : "left";
    
    return (
        <div className={`wh-75-10p ml-0 mr-auto text-${direction}`}>
            <div className="mb-2">
                <div className={direction==="left" ? "speechBubble" : "speechBubble-right"}>
                    {chat.type==="text" && <p>{chat.content}</p>}
                    {chat.type==="choice" && typeof chat.content!=="string" && <div>
                        {chat.content.map((item)=>(
                            <button onClick={()=>{response(item)}}>
                                {item}
                            </button>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ChatBubble
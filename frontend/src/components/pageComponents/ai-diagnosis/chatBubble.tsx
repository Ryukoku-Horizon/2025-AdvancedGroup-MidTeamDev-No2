import { ClipLoader } from "react-spinners";
import { Chat } from "../../../types/chat"
import {motion} from "framer-motion"

type Props={
    chat:Chat;
    response: (res: string) => Promise<void>;
}

const ChatBubble=({chat,response}:Props)=>{
    const direction = chat.speaker==="user" ? "right" : "left";
    
    return (
        <div className={`wh-75-10p ml-0 mr-auto text-${direction}`}>
            <div className="mb-2">
                <div className={direction==="left" ? "speechBubble" : "speechBubble-right"}>
                    {chat.type==="loading" && <ClipLoader size={54} />}
                    {chat.type==="text" && typeof chat.content==="string" &&
                        <p>{chat.speaker==="user" ? chat.content :
                        chat.content.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1, delay: index * 0.085 }}
                            >
                                {char}
                            </motion.span>
                        ))
                    }</p>
                    }
                    {chat.type==="choice" && typeof chat.content!=="string" && <div>
                        {chat.content.map((item,i)=>(
                            <button onClick={()=>{response(item)}} key={i}>
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
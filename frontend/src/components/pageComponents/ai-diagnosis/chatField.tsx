import { useEffect, useRef } from "react"
import ChatItem from "./chatItem";
import useDiagnosis from "../../../hooks/useDiagosis";
import InputField from "./inputField";

type Props={
    isStarted:boolean;
}

const ChatField =({isStarted}:Props)=>{
    const {chatList,setQnAInChat,response,isInput} = useDiagnosis(isStarted)
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [chatList]);

    if(isStarted)
    return (
        <>
            <div className="w-full h-full relative scrollY">
                {chatList.map((item,i)=>(
                    <ChatItem chat={item} response={response} key={i} />
                ))}
                <div className="h-4 w-1" ref={bottomRef} />
            </div>
            {isInput && <div className="absolute b-0 w-full flex justify-center">
                <InputField response={response} />
            </div>}
        </>
    )

    return <div></div>
}

export default ChatField;
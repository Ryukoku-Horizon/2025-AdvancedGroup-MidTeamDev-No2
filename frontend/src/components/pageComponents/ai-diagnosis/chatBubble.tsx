type Props={
    direction: "left" | "right"
    text:string;
}

const ChatBubble=({direction,text}:Props)=>{
    
    return (
        <div className={`wh-75-10p ml-0 mr-auto text-${direction}`}>
            <div className="mb-2">
                <div className={direction==="left" ? "speechBubble" : "speechBubble-right"}>
                    {text}
                </div>
            </div>
        </div>
    )
}

export default ChatBubble
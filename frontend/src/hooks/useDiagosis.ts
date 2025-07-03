import { useEffect, useState } from "react";
import { Chat } from "../types/chat";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../constants/supabase";
import { QnAs } from "../constants/qna";
import { QnA } from "../types/QnA";

type QandA = {
    q: string;
    a: string;
}

const useDiagnosis=(isStarted:boolean)=>{
    const [chatList,setChatList] =useState<Chat[]>([]);
    const [requestBody,setRequestBody] = useState<QandA[]>([])
    const [loading,setLoading] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [remainQnA,setRemainQnA] = useState(QnAs);
    const [interTime,setInterTime] = useState(0);

    const response=(res:string)=>{
        const q = chatList[chatList.length - 1].content as string;
        const target = QnAs.find((item)=>item.q === q)
        if(target){
            setAnswers({[target.id]:res})
            setRequestBody((prev)=>[...prev,{q:q,a:res}])
        }
        const responseToChat:Chat = {type:"text",content:res,speaker:"user"};
        setChatList((prev)=>[...prev.slice(0,prev.length - 1),responseToChat])
        if(interTime<5){
            setQnAInChat()
        }else{

        }
    }

    const setQnAInChat=()=>{
        const current = [] as QnA[]
        current.push(...remainQnA.filter(qna => qna.condition && qna.condition(answers)))
        if(current.length===0){
            current.push(...QnAs.filter(qna => !qna.condition))
        }
        const randomItem = current[Math.floor(Math.random() * current.length)];
        if(randomItem){
            setChatList((prev)=>[...prev,{content:randomItem.q,speaker:"ai",type:"text"}])
            setTimeout(()=>{
                if(randomItem.a.length!==0){
                    setChatList((prev)=>[...prev,{content:randomItem.a,speaker:"user",type:"choice"}])
                }else{
                    setChatList((prev)=>[...prev,{content:randomItem.a,speaker:"user",type:"input"}])
                }
            },1200)
        }
        setRemainQnA((prev)=>prev.filter((item)=>item.id!==randomItem.id))
        setInterTime((prev)=>prev + 1)
    }

    useEffect(()=>{
        if(isStarted){
            setTimeout(()=>{
                setQnAInChat()
            },1500)
        }
    },[isStarted])

    const requestAi=async()=>{
        try{
            setLoading(true)
            const res = await fetch(`${SUPABASE_URL}/functions/v1/insert_pending`,{
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ QandAs:requestBody }),
                mode: "cors"   
            })
            if(!res.ok){

            }
            const { response } = await res.json()
            setChatList((prev)=>[...prev,{content:response,type:"text",speaker:"ai"}])
        }finally{
            setLoading(false)
        }
    }

    return {chatList,loading,setQnAInChat,requestAi,response}
}

export default useDiagnosis;
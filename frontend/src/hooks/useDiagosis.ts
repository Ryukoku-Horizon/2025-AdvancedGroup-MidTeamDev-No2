import { useEffect, useState } from "react";
import { Chat } from "../types/chat";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../constants/supabase";
import { QnAs } from "../constants/qna";
import { QnA } from "../types/QnA";
import { getCircleData } from "../libs/gateways";
import { convertCircleData } from "../libs/convertPendingData";

type QandA = {
    q: string;
    a: string;
}

const useDiagnosis=(isStarted:boolean)=>{
    const [chatList,setChatList] =useState<Chat[]>([]);
    const [requestBody,setRequestBody] = useState<QandA[]>([]);
    const [question,setQuestion] = useState("")
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [remainQnA,setRemainQnA] = useState<QnA[]>(QnAs);
    const [interTime,setInterTime] = useState(0);
    const [isInput,setIsInput] = useState(false)

    const response=async(res:string)=>{
        setIsInput(false)
        const target = QnAs.find((item)=>item.q === question)
        if(target){
            setAnswers({[target.id]:res})
        }
        const newRequestBody = [...requestBody, { q: question, a: res }];
        setRequestBody((prev)=>{
            return [...prev,{q:question,a:res}]
        })
        const responseToChat:Chat = {type:"text",content:res,speaker:"user"};
        setChatList((prev)=>[...prev.slice(0,prev.length - 1),responseToChat])
        if(interTime<6){
            setQnAInChat()
        }
        if(interTime>=6){
            requestAi(newRequestBody)
        }
    }

    const setQnAInChat=()=>{
        console.log(interTime)
        const current = [] as QnA[]
        const matched = remainQnA.filter(qna => qna.condition && qna.condition(answers))
        console.log(matched)
        current.push(...matched)
        if(matched.length===0){
            current.push(...remainQnA.filter(qna => !qna.condition))
        }
        let randomItem = current[Math.floor(Math.random() * current.length)];
        console.log("current",current)
        if(interTime===2 && current.includes( {id:"type",q:"体育会系と文化系のどちらに興味がありますか？",a:["体育会系","文化系","どちらも"]})){
            randomItem =  {id:"type",q:"体育会系と文化系のどちらに興味がありますか？",a:["体育会系","文化系","どちらも"]}
        }
        if(interTime===4 && current.includes({id:"canpuse",q:"どのキャンパスを希望しますか？",a:["瀬田","深草","どこでもいい"]})){
            randomItem = {id:"canpuse",q:"どのキャンパスを希望しますか？",a:["瀬田","深草","どこでもいい"]}
        }
        if(interTime===5){
            randomItem = {id:"any",q:"最後にあなたの希望や興味のある分野について教えてください",a:[]}
        }
        if(randomItem){
            setChatList((prev)=>[...prev,{content:randomItem.q,speaker:"ai",type:"text"}])
            setQuestion(randomItem.q)
            setTimeout(()=>{
                if(randomItem.a.length!==0){
                    setChatList((prev)=>[...prev,{content:randomItem.a,speaker:"user",type:"choice"}])
                }else{
                    setChatList((prev)=>[...prev,{content:randomItem.a,speaker:"user",type:"input"}])
                    setIsInput(true)
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

    const requestAi=async(requestBody:QandA[])=>{
        try{
            setChatList((prev)=>[...prev,{content:"",speaker:"ai",type:"loading"}])
            const res = await fetch(`${SUPABASE_URL}/functions/v1/diagnosis`,{
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ QandAs:requestBody }),
                mode: "cors"   
            })
            if(!res.ok){
                return;
            }
            const { response,id } = await res.json() as {response:string,id:string[]}
            setChatList((prev)=>
            [
                ...prev.filter((item)=>item.type!=="loading"),
                {content:response,type:"text",speaker:"ai"},
                {content:id[0],type:"cirlce",speaker:"ai"}
            ]
            )
        }catch(e){
            console.error("error:",e)
            setChatList((prev)=>prev.filter((item)=>item.type!=="loading"))

        }
    }

    return {chatList,setQnAInChat,requestAi,response,isInput}
}

export default useDiagnosis;
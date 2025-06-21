import { useEffect, useState } from "react";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../constants/supabase";

const useResponse=(setShowModal:(arg:boolean)=>void)=>{
    const [errMessage,setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                setShowModal(false)
            },1500)
        }
    },[success])

    const closeModal=()=>{
        setErrMessage("");
        setSuccess(false);
        setShowModal(false)
    }

    const approve=async(pendingData)=>{
        try{
            setLoading(true)
            const res = await fetch(`${SUPABASE_URL}/functions/v1/approve`,{
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ 
                    id:pendingData.id,
                    email:pendingData.email,
                    name:pendingData.name,
                    location:pendingData.location,
                    activeDate:pendingData.activeDate,
                    detail:pendingData.detail }),
                mode: "cors"   
            })
            if(!res.ok){
                const errText = await res.text();
                setErrMessage(`${res.status}：${errText}`);
                console.error("Error:", res.status, errText);
                return;
            }
            const { success } = await res.json();
            setSuccess(success)
        }catch(e){
            setErrMessage(`失敗しました:${e}`)
        }finally{
            setLoading(false)
        }
    }

    const deny=async(pendingData)=>{
        try{
            setLoading(true)
            const res = await fetch(`${SUPABASE_URL}/functions/v1/deny_request`,{
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ 
                    id:pendingData.id,
                    email:pendingData.email,
                    name:pendingData.name}),
                mode: "cors"   
            })
            if(!res.ok){
                const errText = await res.text();
                setErrMessage(`${res.status}：${errText}`);
                console.error("Error:", res.status, errText);
                return;
            }
            const { success } = await res.json();
            setSuccess(success)
        }catch(e){
            setErrMessage(`失敗しました:${e}`)
        }finally{
            setLoading(false)
        }
    }

    return {approve,deny,loading,errMessage,success,closeModal}
}

export default useResponse;
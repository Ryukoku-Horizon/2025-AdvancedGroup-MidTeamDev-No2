import { useEffect, useState } from "react"
import { SUPABASE_URL, SUPABASE_ANON_KEY} from "../constants/supabase";
import { navigate } from "gatsby"

const useRequest=()=>{
    const [loading,setLoading] = useState(false);
    const [loadingMessage,setLoadingMessage] = useState("");
    const [errMessage,setErrMessage] = useState("");
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                navigate("/comp");
            },1500)
        }
    },[success])

    const request=async(email:string,name:string,location:string,activeDate:string,detail:string)=>{
        try{
            setLoading(true)
            const res = await fetch(`${SUPABASE_URL}/functions/v1/insert_pending`,{
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ email,name,location,activeDate,detail }),
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
            setErrMessage(`申請に失敗しました:${e}`)
        }finally{
            setLoadingMessage("")
            setLoading(false)
        }
    }

    return {loading,loadingMessage,errMessage,success,request};
}

export default useRequest;
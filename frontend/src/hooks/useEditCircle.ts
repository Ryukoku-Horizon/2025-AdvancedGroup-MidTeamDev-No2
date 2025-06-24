import { useEffect, useState } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY} from "../constants/supabase";
import { useNavigate } from "react-router-dom"
import { Circle } from "../types/Circle";

const useEditCircle=(id:string | undefined)=>{
    const [errMessage,setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                navigate(`/manage/${id}`)
            },1500);
        }
    },[success])

    const edit=async(circleData:Circle)=>{
        setLoading(true)
        try{
            const res = await fetch(`${SUPABASE_URL}/functions/v1/edit_circle`, {
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ 
                    id:circleData.id,
                    email:circleData.email,
                    name:circleData.name,
                    location:circleData.location,
                    activeDate:circleData.activeDate,
                    detail:circleData.detail 
                })
            });
            if(!res.ok){
                setErrMessage(`${res.status}：${await res.text()}`);
                console.error("Error:", res.status, await res.text());
                return;
            }
            const { success } = await res.json();
            if(success){
                setSuccess(success)
            }
        }catch(e){
            setErrMessage(`ログインに失敗しました:${e}`)
        }finally{
            setLoading(false)
        }
    }

    return { edit,errMessage,loading,success }
}

export default useEditCircle;
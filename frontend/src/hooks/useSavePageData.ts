import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../constants/supabase";
import { Block } from "../types/block";
import { blockToEntity } from "../libs/blockToEntity";

const useSavePageData=(id:string | undefined)=>{
    const [errMessage,setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                navigate(`/manage/${id}`)
            },1500);
        }
    },[success,id,navigate])

    const save=async(blocks:Block[],circleId:string | undefined)=>{
        if(!circleId) return;
        setLoading(true)
        try{
            const blockEntities = blocks.map((item)=>blockToEntity(item,circleId))
            const res = await fetch(`${SUPABASE_URL}/functions/v1/insert_pageData`, {
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ 
                    blocks:blockEntities,
                    circleId
                }),
                mode: "cors"
            });
            if(!res.ok){
                setErrMessage(`${await res.text()}`);
                console.error("Error:", res.status, await res.text());
                return;
            }
            const { success } = await res.json();
            if(success){
                setSuccess(success)
            }
        }catch(e){
            setErrMessage(`保存中にエラーが発生しました:${e}`)
            console.error(e)
        }finally{
            setLoading(false)
        }
    }

    return {success,loading,errMessage,save}
}

export default useSavePageData
import { useEffect, useState } from "react";
import { convertPendingData } from "../libs/convertPendingData";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../constants/supabase";
import { Circle } from "../types/Circle";

const usePendingData=()=>{
    const [pendingData,setPendingData] =useState<Circle[]>([]);
    const [loading,setLoading] = useState(false);
    const [n,setN] = useState(0)

    useEffect(()=>{
        const fetchData=async(select:string,match?:{[key:string]:string})=>{
            if(n!==0){
                try{
                    setLoading(true)
                    const res = await fetch(`${SUPABASE_URL}/functions/v1/get_pending`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                        },
                        body:JSON.stringify({
                            match,
                            select
                        })
                    })
                    if(!res.ok){
                        console.error("データ取得に失敗しました");
                        return;
                    }
                    const data = await res.json();
                    setPendingData(convertPendingData(data))
                }catch(e){
                    console.error("エラー:",e)
                }finally{
                    setLoading(false)
                }
            }
        }
        fetchData("*",{})
    },[n])

    return {pendingData,loading,n,setN,setPendingData}
}

export default usePendingData;
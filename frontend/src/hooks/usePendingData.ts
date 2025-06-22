import { useEffect, useState } from "react";
import { convertPendingData } from "../libs/convertPendingData";
import { Circle } from "../types/Circle";
import { getPendingData } from "../libs/gateways";

const usePendingData=()=>{
    const [pendingData,setPendingData] =useState<Circle[]>([]);
    const [loading,setLoading] = useState(false);
    const [n,setN] = useState(0)

    useEffect(()=>{
        const fetchData=async()=>{
            if(n!==0){
                try{
                    setLoading(true)
                    const {success,data} = await getPendingData("*",{})
                    if(success && data){
                        setPendingData(convertPendingData(data))
                    }
                }finally{
                    setLoading(false)
                }
            }
        }
        fetchData()
    },[n])

    return {pendingData,loading,n,setN,setPendingData}
}

export default usePendingData;
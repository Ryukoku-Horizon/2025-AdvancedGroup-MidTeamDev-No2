import { useEffect, useState } from "react";
import { convertCircleData } from "../libs/convertPendingData";
import { Circle, StringfyCircle } from "../types/Circle";
import { getCircleData } from "../libs/gateways";

const useAllCircleData=()=>{
    const [circleData,setCircleData] =useState<Circle[]>([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true)
                const {success,data} = await getCircleData("*",{})
                if(success && data){
                    setCircleData(data.map((item:StringfyCircle) =>convertCircleData(item)))
                }else if(!success){

                }
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])

    return {circleData,loading}
}

export default useAllCircleData;
import { useEffect, useState } from "react";
import { convertCircleData } from "../libs/convertPendingData";
import { Circle } from "../types/Circle";
import { getCircleData } from "../libs/gateways";

const useCircleData=(id:string | undefined)=>{
    const [circleData,setCircleData] =useState<Circle | null>(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetchData=async(id:string)=>{
            try{
                setLoading(true)
                const {success,data} = await getCircleData("*",{id})
                if(success && data){
                    setCircleData(convertCircleData(data[0]))
                }else if(!success){

                }
            }finally{
                setLoading(false)
            }
        }
        if(id) fetchData(id)
    },[id])

    return {circleData,loading}
}

export default useCircleData;
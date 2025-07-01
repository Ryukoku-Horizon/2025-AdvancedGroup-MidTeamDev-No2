import { useEffect, useState } from "react";
import { convertCircleData } from "../libs/convertPendingData";
import { Circle, StringfyCircle } from "../types/Circle";
import { getCircleData } from "../libs/gateways";

const useCircles=(startLoad:boolean,limit:number,initOffset:number)=>{
    const [circleData,setCircleData] =useState<Circle[]>([]);
    const [loading,setLoading] = useState(false);
    const [hasMore,setHasMore] = useState(false)
    const [offset,setOffset] = useState(initOffset)

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true)
                const {success,data} = await getCircleData("*",{},limit,offset)
                if(success && data){
                    if(data.length===limit){
                        setHasMore(true)
                    }else{
                        setHasMore(false)
                    }
                    setCircleData((prev) => [
                        ...prev,
                        ...data.map((item: StringfyCircle) => convertCircleData(item)),
                      ]);
                }else if(!success){

                }
            }finally{
                setLoading(false)
            }
        }
        if(startLoad){
            fetchData()
        }
    },[startLoad,limit,offset])

    return {circleData,loading,hasMore,setOffset}
}

export default useCircles;
import { useEffect, useState } from "react";
import { getPageData } from "../libs/gateways";
import { Block, BlockEntity } from "../types/block";
import { entityToBlock } from "../libs/blockToEntity";

const usePageData=(id:string | undefined)=>{
    const [pageData,setPageData] =useState<Block[]>([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetchData=async(id:string)=>{
            try{
                setLoading(true)
                const {data,success} = await getPageData("*",{"circleId":id})
                if(data && success){
                    setPageData(data.map((item:BlockEntity)=>entityToBlock(item)))
                }
            }finally{
                setLoading(false)
            }
        }
        if(id) fetchData(id)
    },[])

    return {pageData,loading}
}

export default usePageData;
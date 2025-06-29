import { useEffect, useState } from "react";
import { getPageData } from "../libs/gateways";
import { Block, BlockEntity } from "../types/block";
import { entityToBlock } from "../libs/blockToEntity";

const usePageData=()=>{
    const [pageData,setPageData] =useState<Block[]>([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true)
                const {data,success} = await getPageData("*",{})
                if(data && success){
                    setPageData(data.map((item:BlockEntity)=>entityToBlock(item)))
                }
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])

    return {pageData,loading,setPageData}
}

export default usePageData;
import { useEffect, useState } from "react";
import { convertCircleData } from "../libs/convertPendingData";
import { Circle, StringfyCircle } from "../types/Circle";
import { searchCircleData } from "../libs/gateways";

const useSearchCircles=(startLoad:boolean,limit:number,initOffset:number)=>{
    const [circleData,setCircleData] =useState<Circle[]>([]);
    const [loading,setLoading] = useState(false);
    const [hasMore,setHasMore] = useState(false);
    const [offset,setOffset] = useState(initOffset);
    const [keyword,setKeyword] = useState("");
    const [trigger,setTrigger] = useState(false)

    useEffect(() => {
        if (!startLoad || keyword.trim() === "") return;
    
        const fetchData = async () => {
          try {
            setLoading(true);
            const { success, data } = await searchCircleData(keyword, limit, offset);
            if (success && data) {
              setHasMore(data.length === limit);
              setCircleData((prev) =>
                offset === 0
                  ? data.map((item: StringfyCircle) => convertCircleData(item)) // 初回 or keyword変更時
                  : [...prev, ...data.map((item: StringfyCircle) => convertCircleData(item))] // 追加読み込み時
              );
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [startLoad, offset,trigger]);
    
      useEffect(() => {
        setOffset(0);
        setCircleData([]);
      }, [trigger]);

    return {circleData,loading,hasMore,setOffset,setKeyword,keyword,offset,setTrigger}
}

export default useSearchCircles;
import { motion } from "framer-motion";
import CommonSearchField from "../../common/textField/commonSerchField";
import CenterLoader from "../../common/loader/centerLoader";
import SingleCircleCard from "../home/singleCIrcleCard";
import { ClipLoader } from "react-spinners";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useSearchCircles from "../../../hooks/useSearch";
import useScrollToBottom from "../../../hooks/useScrollToBottom";

type Props={
    setStartLoad: React.Dispatch<React.SetStateAction<boolean>>
    startLoad:boolean;   
}

const SearchField=({setStartLoad,startLoad}:Props)=>{
    const limit = 9;
    const listRef = useRef<HTMLElement | null>(null);
    const {setKeyword,keyword,circleData,loading,hasMore,setOffset,offset,setTrigger} = useSearchCircles(startLoad,limit,0)
    const location = useLocation();

    useEffect(()=>{
        if(location.state?.keyword){
            setKeyword(location.state?.keyword)
            if(!startLoad) setStartLoad(true)
            setTrigger((p)=>!p)
        }
    },[location.state])

    useScrollToBottom(()=>{
        if (hasMore && !loading && startLoad && circleData.length >= 6) {
            setOffset((prev) => prev + limit);
        }
    })

    const handleClick=()=>{
        if(!startLoad) setStartLoad(true)
        setTrigger((p)=>!p)
    }

    return (
        <>
            <motion.div
                key="search-bar"
                initial={false}
                animate={{ marginTop: startLoad ? 8 : 40, marginBottom: startLoad ? 16 : 40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full flex justify-center m-0"
                >
                <CommonSearchField 
                value={keyword} 
                onChange={(e)=>setKeyword(e.target.value)} 
                onClick={()=>{handleClick()}}
                className="m-0" />
            </motion.div>
            <section id="circle-list" ref={listRef}>
                {loading && offset <= 0 && <CenterLoader />}
                {(!loading || startLoad) && (
                    <div>
                        <div className="circle-grid">
                            {circleData.map((item) => (
                            <SingleCircleCard key={item.id} circleData={item} />
                            ))}
                        </div>
                        {circleData.length===0 && !loading && startLoad && <div>
                            <p>サークルが見つかりません</p>    
                        </div>}
                    </div>
                )}
                <div className="w-full h-3">
                    {loading && offset > 7 && (
                        <div className="flex justify-center">
                        <ClipLoader color="#36d7b7" size={100} />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default SearchField;
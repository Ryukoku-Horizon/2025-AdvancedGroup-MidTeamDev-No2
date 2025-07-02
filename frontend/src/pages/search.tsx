import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import CommonSearchField from "../components/common/textField/commonSerchField";
import { Link } from "react-router-dom";
import useSearchCircles from "../hooks/useSearch";
import { motion, AnimatePresence } from "framer-motion";
import CenterLoader from "../components/common/loader/centerLoader";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";
import { ClipLoader } from "react-spinners";
import useScrollToBottom from "../hooks/useScrollToBottom";

const Search=()=>{
    const limit = 6;
    const [startLoad,setStartLoad] = useState(false)
    const listRef = useRef<HTMLElement | null>(null);
    const {setKeyword,keyword,circleData,loading,hasMore,setOffset,offset,setTrigger} = useSearchCircles(startLoad,limit,0)

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
        <Layout>
            <Link to="/" className="login-link ml-2 mt-1">← ホームページへ</Link>
            <div className="flex flex-col items-center justify-center w-full">
                <AnimatePresence>
                    {!startLoad && (
                        <motion.div 
                        key="title"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                        className="flex flex-col items-center justify-centers mt-6 pt-8">
                            <p className="font-xl bold mb-0">検索</p>
                            <p className="gray-2 font-2xl bold mt-0 mb-5">気になるサークルを簡単検索</p>
                        </motion.div>)}
                </AnimatePresence>
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
            </div>
        </Layout>
    )
}

export default Search;
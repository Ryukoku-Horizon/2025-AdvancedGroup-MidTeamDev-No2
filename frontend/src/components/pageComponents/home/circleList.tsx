import { useEffect, useRef, useState } from "react";
import useCircles from "../../../hooks/useCircles";
import CenterLoader from "../../common/loader/centerLoader";
import SingleCircleCard from "./singleCIrcleCard";
import { ClipLoader } from "react-spinners";

const CircleList=()=>{
    const [startLoad, setStartLoad] = useState(false);
    const listRef = useRef<HTMLElement | null>(null);
    const limit = 6
    const { circleData, loading, setOffset,hasMore,offset } = useCircles(startLoad,limit,0);
    // useScrollToBottom(()=>{
    //   if (hasMore && !loading && startLoad && circleData.length >= 6) {
    //     setOffset((prev) => prev + limit);
    //   }
    // })

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
            setStartLoad(true);
            observer.disconnect();
            }
        },
        { threshold: 0.6 }
        );
        if (listRef.current) {
        observer.observe(listRef.current);
        }
        return () => observer.disconnect();
    }, []);
    return (
        <section className="circle-list-section" id="circle-list" ref={listRef}>
          <h2 className="section-title">サークル一覧</h2>
          <div className="circle-list">
            {loading && offset <= 0 && <CenterLoader />}
            {(!loading || startLoad) && (
              <div className="circle-grid">
                {circleData.map((item) => (
                  <SingleCircleCard key={item.id} circleData={item} />
                ))}
              </div>
            )}
          </div>
          <div className="w-full h-3">
            {loading && offset > 7 && (
                <div className="flex justify-center">
                  <ClipLoader color="#36d7b7" size={100} />
                </div>
              )}
          </div>
        </section>
    )
}

export default CircleList;
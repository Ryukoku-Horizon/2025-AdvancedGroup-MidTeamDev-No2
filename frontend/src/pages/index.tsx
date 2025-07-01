import Layout from "../components/Layout/Layout";
import useCircles from "../hooks/useCircles";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";
import CenterLoader from "../components/common/loader/centerLoader";
import "../styles/Home.css";
import HeroSection from "../components/pageComponents/home/heroSection";
import { useEffect, useRef, useState } from "react";
import useScrollToBottom from "../hooks/useScrollToBottom";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [startLoad, setStartLoad] = useState(false);
  const listRef = useRef<HTMLElement | null>(null);
  const limit = 6
  const { circleData, loading, setOffset,hasMore } = useCircles(startLoad,limit,0);
  useScrollToBottom(()=>{
    if (hasMore && !loading && startLoad) {
      setOffset((prev) => prev + limit);
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log("intersecting?", entry.isIntersecting);
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
    <Layout>
      <div className="home-container">
        <HeroSection />
        <section className="circle-list-section" id="circle-list" ref={listRef}>
          <h2 className="section-title">サークル一覧</h2>
          <div className="circle-list">
            {loading && !startLoad && <CenterLoader />}
            {(!loading || startLoad) && (
              <div className="circle-grid">
                {circleData.map((item) => (
                  <SingleCircleCard key={item.id} circleData={item} />
                ))}
              </div>
            )}
          </div>
          {loading && hasMore && startLoad && (
              <div className="flex justify-center">
                <ClipLoader color="#36d7b7" size={100} />
              </div>
            )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;

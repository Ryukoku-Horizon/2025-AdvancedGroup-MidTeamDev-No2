import Layout from "../components/Layout/Layout";
import useCircles from "../hooks/useCircles";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";
import "../styles/Home.css";
import HeroSection from "../components/pageComponents/home/heroSection";
import { useRef } from "react";
import useScrollToBottom from "../hooks/useScrollToBottom";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const listRef = useRef<HTMLElement | null>(null);
  const limit = 6
  const { circleData, loading, setOffset,hasMore } = useCircles(limit,3);

  useScrollToBottom(()=>{
    if (hasMore && !loading) {
      setOffset((prev) => prev + limit);
    }
  })

  return (
    <Layout>
      <div className="home-container">
        <HeroSection />
        <section className="circle-list-section" id="circle-list" ref={listRef}>
          <h2 className="section-title">サークル一覧</h2>
          <div className="circle-list">
            
            <div className="circle-grid">
              {circleData.map((item) => (
                <SingleCircleCard key={item.id} circleData={item} />
              ))}
            </div>
          </div>
          {loading && (
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

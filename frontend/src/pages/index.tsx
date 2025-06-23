import Layout from "../components/Layout/Layout";
import useAllCircleData from "../hooks/useAllCircle";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";
import CenterLoader from "../components/common/loader/centerLoader";
import { motion } from "framer-motion";
import "../styles/Home.css";
import HeroSection from "../components/pageComponents/home/heroSection";

const Home = () => {
  const { circleData, loading } = useAllCircleData();

  return (
    <Layout>
      <div className="home-container">
        <HeroSection />

        <section className="circle-list-section">
          <h2 className="section-title">サークル一覧</h2>
          <div>
            {loading && <CenterLoader />}
            {!loading && (
              <div className="circle-grid">
                {circleData.map((item) => (
                  <SingleCircleCard key={item.id} circleData={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;

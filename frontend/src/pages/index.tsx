import Layout from "../components/Layout/Layout";
import "../styles/Home.css";
import HeroSection from "../components/pageComponents/home/heroSection";
import CircleList from "../components/pageComponents/home/circleList";

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <HeroSection />
        <CircleList />
      </div>
    </Layout>
  );
};

export default Home;

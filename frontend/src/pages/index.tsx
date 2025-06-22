import Layout from "../components/Layout/Layout"
import { Link } from "react-router-dom";
import useAllCircleData from "../hooks/useAllCircle";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";
import CenterLoader from "../components/common/loader/centerLoader";

const Home = () => {
  const {circleData,loading} = useAllCircleData()

  return (
    <Layout>
      <div className="flex flex-col">
        <Link to="/login">login</Link>
        <Link to="/request">request</Link>
        <Link to="search">search</Link>
      </div>
      {loading && <CenterLoader />}
      {!loading && <div>
        {circleData.map((item)=>(
          <SingleCircleCard circleData={item} />
        ))}  
      </div>}
    </Layout>
)}

export default Home

import Layout from "../components/Layout/Layout"
import { Link } from "react-router-dom";
import useAllCircleData from "../hooks/useAllCircle";
import { ClipLoader } from "react-spinners";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";

const Home = () => {
  const {circleData,loading} = useAllCircleData()

  return (
    <Layout>
      <div className="flex flex-col">
        <Link to="/login">login</Link>
        <Link to="/request">request</Link>
        <Link to="search">search</Link>
      </div>
      {loading && <ClipLoader color="#36d7b7" size={56} />}
      {!loading && <div>
        {circleData.map((item)=>(
          <SingleCircleCard circleData={item} />
        ))}  
      </div>}
    </Layout>
)}

export default Home

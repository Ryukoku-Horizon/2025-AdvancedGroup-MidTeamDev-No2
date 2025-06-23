import Layout from "../components/Layout/Layout"
import useAllCircleData from "../hooks/useAllCircle";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard";
import CenterLoader from "../components/common/loader/centerLoader";

const Home = () => {
  const {circleData,loading} = useAllCircleData()

  return (
    <Layout>
      {loading && <CenterLoader />}
      {!loading && <div className="mt-5 grid grid-2">
        {circleData.map((item)=>(
          <SingleCircleCard circleData={item} />
        ))}  
      </div>}
    </Layout>
)}

export default Home

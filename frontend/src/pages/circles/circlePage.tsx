import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import useCircleData from "../../hooks/useSingleCircle";
import CenterLoader from "../../components/common/loader/centerLoader";
import CircleInfo from "../../components/pageComponents/manage/circle/circleInfo";

const CirclePage=()=>{
    const { id } = useParams();
    const {circleData,loading} = useCircleData(id);

    return (
        <Layout>
            <div className="manage-container">
                <div className="main-content">
                    <section className="circle-info">
                    {!loading && circleData && <div>
                        <CircleInfo circleData={circleData} />
                    </div>}
                    {loading && <CenterLoader />}
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default CirclePage;
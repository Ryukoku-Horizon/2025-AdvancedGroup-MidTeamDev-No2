import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import PageContent from "../../components/pageComponents/circlePage/pageContent";

const CirclePage=()=>{
    const { id } = useParams();

    return (
        <Layout>
            <div className="manage-container">
                <div className="main-content flex flex-col items-center justify-center">
                    <PageContent circleId={id} />
                </div>
            </div>
        </Layout>
    )
}

export default CirclePage;
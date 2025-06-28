import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import TopBar from "../../components/pageComponents/manage/topbar";
import useSingleCircleData from "../../hooks/useSingleCircle";
import Editor from "../../components/pageComponents/manage/editPage/editor";
import Title from "../../components/common/title/title";
import CenterLoader from "../../components/common/loader/centerLoader";

const EditPage=()=>{
    const { id } = useParams();
    const {circleData,loading:dataLoad} = useSingleCircleData(id)
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="manage-container">
                <TopBar back={()=>{navigate(`/manage/${id}`)}} />
                <div className="main-content">
                    {!dataLoad && circleData && <section className="circle-info">
                        <Title text={circleData.name} />
                        <Editor />
                    </section>}
                    {dataLoad && <CenterLoader />}
                </div>
            </div>
        </Layout>
    )
}

export default EditPage;
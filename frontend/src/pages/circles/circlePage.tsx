import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import useCircleData from "../../hooks/useSingleCircle";
import CenterLoader from "../../components/common/loader/centerLoader";

const CirclePage=()=>{
    const { id } = useParams();
    const {circleData,loading} = useCircleData(id);

    return (
        <Layout>
            <div className="manage-container">
                <div className="main-content">
                    <section className="circle-info">
                    {!loading && circleData && <div>
                        <p>{circleData.name}</p>
                        <p>基本情報</p>
                        <p>活動内容：{circleData.detail}</p>
                        <div className="flex gap-2">
                            <p>活動キャンパス</p>
                            {circleData.location.map((item)=>(
                                <p>{item}</p>
                            ))}
                        </div>
                        <div>
                            {circleData.activeDate.type==="毎週" && <p>
                                {typeof circleData.activeDate.data!=="string" && circleData.activeDate.data.week.map((item)=>(<span>{item}</span>))}
                            </p>}
                        </div>
                    </div>}
                    {loading && <CenterLoader />}
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default CirclePage;
import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import { Link,useParams } from "react-router-dom";
import useSingleCircleData from "../../hooks/useSingleCircle";
import CenterLoader from "../../components/common/loader/centerLoader";
import RequireLoginMessage from "../../components/common/messageBord/requireLoginMessage";

const ManageCircle=()=>{
    const { id } = useParams();
    const {circleData,loading:dataLoading} = useSingleCircleData(id);
    const {user,loading,logout} = useFirebaseUser();

    return (
        <Layout>
            {user && !dataLoading && circleData && <div>
                <button onClick={()=>{logout()}}>ログアウト</button>
                <Link to={`/manage/${circleData.id}/edit`}>ページを編集する</Link>
                <Link to={`/manage/${circleData.id}/editProfile`}>プロフィールを編集する</Link>
                <Link to={`/`}>ページを閲覧する</Link>
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
            {(loading || dataLoading) && <CenterLoader />}
            {!user && !loading && <RequireLoginMessage />}
        </Layout>
    )
}

export default ManageCircle;
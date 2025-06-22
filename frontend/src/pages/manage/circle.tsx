import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import { Link, useNavigate,useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useCircleData from "../../hooks/useCircle";

const ManageCircle=()=>{
    const { id } = useParams();
    console.log("id",id)
    const {circleData,loading:dataLoading} = useCircleData(id);
    const {user,loading,logout} = useFirebaseUser()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user && !loading){
            navigate("/")
        }
    },[user])

    return (
        <Layout>
            {user && !dataLoading && circleData && <div>
                <button onClick={()=>{logout()}}>ログアウト</button>
                <Link to={`/manage/${circleData.id}/edit`}>ページを編集する</Link>
                <Link to={`/manage`}>プロフィールを編集する</Link>
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
            {!user && loading && dataLoading && 
            <div className="items-center justify-center">
                <ClipLoader size={100} />
            </div>}
        </Layout>
    )
}

export default ManageCircle;
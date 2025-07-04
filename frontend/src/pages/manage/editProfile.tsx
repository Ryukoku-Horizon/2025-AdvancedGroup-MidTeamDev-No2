import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import { useEffect } from "react";
import TopBar from "../../components/pageComponents/manage/topbar";
import MainScreen from "../../components/pageComponents/manage/mainScreen";
import SideMenu from "../../components/pageComponents/manage/sidemenu";
import RequireLoginMessage from "../../components/common/messageBord/requireLoginMessage";
import EditForm from "../../components/pageComponents/manage/editProfile/editForm";

const EditProfile=()=>{
    const { id } = useParams();
    const {user,loading} = useFirebaseUser();
    const navigate = useNavigate()
    const env = process.env.REACT_APP_URL ?? ""

    useEffect(()=>{
        if(!user && !loading){
            navigate("/")
        }
    },[user,loading,navigate])

    return (
        <Layout>
            {!user && !loading && <RequireLoginMessage />}
            <div className="manage-container">
            <TopBar back={()=>{navigate(`${env}/manage/${id}`)}} />
                <div className="main-content">
                    <SideMenu id={id} />
                    <MainScreen>
                        <EditForm loading={loading} circleId={id} />
                    </MainScreen>
                </div>
            </div>
        </Layout>
    )
}

export default EditProfile;
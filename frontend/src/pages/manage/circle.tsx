import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import {  useParams } from "react-router-dom";
import useSingleCircleData from "../../hooks/useSingleCircle";
import CenterLoader from "../../components/common/loader/centerLoader";
import RequireLoginMessage from "../../components/common/messageBord/requireLoginMessage";
import CircleInfo from "../../components/pageComponents/manage/circle/circleInfo";
import TopBar from "../../components/pageComponents/manage/topbar";
import MainScreen from "../../components/pageComponents/manage/mainScreen";
import SideMenu from "../../components/pageComponents/manage/sidemenu";

const ManageCircle = () => {
  const { id } = useParams();
  const { circleData, loading: dataLoading } = useSingleCircleData(id);
  const { user, loading, logout } = useFirebaseUser();

  return (
    <Layout>
      {!user && !loading && <RequireLoginMessage />}

        <div className="manage-container">
            <TopBar logout={logout} />
            <div className="main-content">
                <SideMenu id={id} />
                <MainScreen>
                    {user && !dataLoading && circleData && <CircleInfo circleData={circleData} />}
                    {(loading || dataLoading) && <CenterLoader />}
                </MainScreen>
            </div>
        </div>
    </Layout>
  );
};

export default ManageCircle;

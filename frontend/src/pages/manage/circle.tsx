import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import {  useParams } from "react-router-dom";
import useSingleCircleData from "../../hooks/useSingleCircle";
import CenterLoader from "../../components/common/loader/centerLoader";
import RequireLoginMessage from "../../components/common/messageBord/requireLoginMessage";
import SideMenu from "../../components/pageComponents/manage/circle/sidemenu";
import CircleInfo from "../../components/pageComponents/manage/circle/circleInfo";

const ManageCircle = () => {
  const { id } = useParams();
  const { circleData, loading: dataLoading } = useSingleCircleData(id);
  const { user, loading, logout } = useFirebaseUser();

  return (
    <Layout>
      {(loading || dataLoading) && <CenterLoader />}
      {!user && !loading && <RequireLoginMessage />}

      {user && !dataLoading && circleData && (
        <div className="manage-container">
            <div className="top-bar">
                <button onClick={() => logout()} className="logout-button">
                ログアウト
                </button>
            </div>

            <div className="main-content">
                <SideMenu id={circleData.id} />
                <CircleInfo circleData={circleData} />
            </div>
        </div>
        )}
    </Layout>
  );
};

export default ManageCircle;

import Modal from 'react-modal'
import "./sidebar.css"
import CommonToggle from "../../common/toggle/toggle";
import SidebarLink from "./sidebarLink";
import useFirebaseUser from '../../../hooks/useFirebase';
import { CircleLoader } from 'react-spinners';

Modal.setAppElement('#root')

type Props={
  showSidebar:boolean;
  setShowSidebar:(arg:boolean)=>void;
}

const Sidebar = ({ showSidebar, setShowSidebar }:Props) => {
  const {user,loading} = useFirebaseUser();

  const env = process.env.REACT_APP_URL ?? ""

  return (
    <Modal
      isOpen={showSidebar}
      onRequestClose={() => setShowSidebar(false)}
      shouldCloseOnOverlayClick={true}
      className="slide-modal"
      overlayClassName="slide-overlay"
      closeTimeoutMS={350}
    >
      <div style={{ marginTop: "4rem" }}>
        <SidebarLink to={`${env}/`} label='ホーム' />
        <SidebarLink to={`${env}/search`} label="検索" />
        <SidebarLink to={`${env}/ai-diagnosis`} label="サークルAI診断" />
        <SidebarLink to={`${env}/fqa`} label="よくある質問" />
        <CommonToggle title="サークル管理者向け">
          {!loading && <>
            {!user && <SidebarLink to={`${env}/login`} label="ログイン" />}
            {!user && <SidebarLink to={`${env}/request`} label="サークル掲載申請" />}
            {user && <SidebarLink to={`${env}/manage/${user.uid}`} label='管理ページ' />}
          </>}
          {loading && <CircleLoader size={32} />}
        </CommonToggle>
      </div>
    </Modal>
  )
}

export default Sidebar

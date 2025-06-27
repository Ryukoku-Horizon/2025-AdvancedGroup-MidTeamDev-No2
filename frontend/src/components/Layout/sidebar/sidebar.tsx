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
        <SidebarLink to='/' label='ホーム' />
        <SidebarLink to="/search" label="検索" />
        <SidebarLink to="/ai-diagnosis" label="サークルAI診断" />
        <SidebarLink to="/fqa" label="よくある質問" />
        <CommonToggle title="サークル管理者向け">
          {!loading && <>
            {!user && <SidebarLink to="/login" label="ログイン" />}
            {!user && <SidebarLink to="/request" label="サークル掲載申請" />}
            {user && <SidebarLink to={`/manage/${user.uid}`} label='管理ページ' />}
          </>}
          {loading && <CircleLoader size={32} />}
        </CommonToggle>
      </div>
    </Modal>
  )
}

export default Sidebar

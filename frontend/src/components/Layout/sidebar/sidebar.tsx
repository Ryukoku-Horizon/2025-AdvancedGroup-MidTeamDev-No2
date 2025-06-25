import Modal from 'react-modal'
import "./sidebar.css"
import CommonToggle from "../../common/toggle/toggle";
import SidebarLink from "./sidebarLink";

Modal.setAppElement('#root')

type Props={
  showSidebar:boolean;
  setShowSidebar:(arg:boolean)=>void;
}

const Sidebar = ({ showSidebar, setShowSidebar }:Props) => {
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
        <SidebarLink to="/fqa" label="よくある質問" />
        <CommonToggle title="サークル管理者向け">
          <>
            <SidebarLink to="/login" label="ログイン" />
            <SidebarLink to="/request" label="サークル掲載申請" />
          </>
        </CommonToggle>
      </div>
    </Modal>
  )
}

export default Sidebar

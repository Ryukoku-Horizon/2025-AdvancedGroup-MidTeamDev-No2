import { Link } from "react-router-dom";
import Modal from 'react-modal'
import "./sidebar.css"

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
        <Link to="/search">
          <p>検索</p>
        </Link>
        {/* <Link to="">
          <p>サークル診断</p>
        </Link> */}
        <Link to="/login">
          <p>ログイン</p>
        </Link>
      </div>
    </Modal>
  )
}

export default Sidebar

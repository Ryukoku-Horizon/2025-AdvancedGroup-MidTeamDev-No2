import { Link } from "gatsby"
import * as React from "react"
import Modal from 'react-modal'
import "./sidebar.css"

Modal.setAppElement('#___gatsby')

const Sidebar = ({ showSidebar, setShowSidebar }) => {
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

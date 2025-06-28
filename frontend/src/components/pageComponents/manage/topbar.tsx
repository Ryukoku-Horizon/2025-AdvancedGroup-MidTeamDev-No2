import { useState } from "react";
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn";
import LogoutModal from "./circle/logoutModal";

type Props={
    logout?: () => Promise<void>
    back?:()=>void;
}

const TopBar=({logout,back}:Props)=>{
    const [showModal,setShowModal] = useState(false)

    return (
        <div className="top-bar">
            {logout && <button onClick={() => {setShowModal(true)}} className="logout-button">
            ログアウト
            </button>}
            {back && <CancelButton onClick={()=>{back()}}>
                戻る
            </CancelButton>}
            <LogoutModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default TopBar;
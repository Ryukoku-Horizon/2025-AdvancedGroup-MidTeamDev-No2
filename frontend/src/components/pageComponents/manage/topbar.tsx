import { useState } from "react";
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn";
import LogoutModal from "./circle/logoutModal";
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn";

type Props={
    logout?: () => Promise<void>;
    back?:()=>void;
    save?:()=>void;
}

const TopBar=({logout,back,save}:Props)=>{
    const [showModal,setShowModal] = useState(false)

    return (
        <div className="top-bar">
            {save && <ConfirmButton onClick={()=>{save()}}>
                保存
            </ConfirmButton>}
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
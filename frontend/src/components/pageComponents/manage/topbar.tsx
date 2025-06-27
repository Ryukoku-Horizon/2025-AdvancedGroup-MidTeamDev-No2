import CancelButton from "../../common/Btn/cancelBtn/cancelBtn";

type Props={
    logout?: () => Promise<void>
    back?:()=>void;
}

const TopBar=({logout,back}:Props)=>{
    return (
        <div className="top-bar">
            {logout && <button onClick={() => {logout()}} className="logout-button">
            ログアウト
            </button>}
            {back && <CancelButton onClick={()=>{back()}}>
                戻る
            </CancelButton>}
        </div>
    )
}

export default TopBar;
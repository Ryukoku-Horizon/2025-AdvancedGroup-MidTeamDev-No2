type Props={
    logout: () => Promise<void>
}

const TopBar=({logout}:Props)=>{
    return (
        <div className="top-bar">
                <button onClick={() => {logout()}} className="logout-button">
                ログアウト
                </button>
            </div>
    )
}

export default TopBar;
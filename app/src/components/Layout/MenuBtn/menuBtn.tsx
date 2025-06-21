import Hamburger from "hamburger-react";
import * as React from "react"

type Props={
    setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>;
    showSidebar:boolean;
}

const MenuBtn=({setShowSidebar,showSidebar}:Props)=>{

    return (
        <Hamburger
            toggled={showSidebar}
            toggle={setShowSidebar}
            direction="right"
            size={32}
            duration={0.4}
        />
    )
}

export default MenuBtn;
import Hamburger from "hamburger-react";
import * as React from "react"

const MenuBtn=({setShowSidebar,showSidebar})=>{

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
import Footer from "./Footer/footer";
import Header from "./Header/header";
import * as React from "react"
import Sidebar from "./sidebar/sidebar";
import { useState } from "react";
import MenuBtn from "./MenuBtn/menuBtn";

type Props={
    children:React.ReactNode
}

const Layout=({children}:Props)=>{
    const [showSidebar,setShowSidebar] = useState(false);

    return (
        <div className="flex flex-col flex-1">
            <div className="fixed r-1 t-1" style={{zIndex: 1100 }}>
                <MenuBtn setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            </div>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Header />
            <main className="flex-1 pt-8 p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;
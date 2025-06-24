import { ReactNode } from "react"
import "./manage.css"

type Props={
    children:ReactNode
}

const MainScreen=({children}:Props)=>{
    return (
        <section className="circle-info">
            {children}
        </section>
    )
}

export default MainScreen;
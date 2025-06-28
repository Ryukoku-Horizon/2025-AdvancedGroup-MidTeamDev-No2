import useToolbar from "../../../../hooks/useToolbar";
import "./toolbar.css"

type Props={
    handleBold: () => void;
    handleUnderline:()=>void;
}

const Toolbar=({handleBold,handleUnderline}:Props)=>{
    const {showToolbar,toolbarPosition} = useToolbar()

    return (
        <div
            className="toolbar"
            style={{
            top: toolbarPosition.top,
            left: toolbarPosition.left,
            display:showToolbar ? "block" : "none"
            }}
        >
            <button onClick={()=>handleBold()}>太字</button>
            <button onClick={()=>handleUnderline()}>下線</button>
        </div>
    )
}

export default Toolbar;
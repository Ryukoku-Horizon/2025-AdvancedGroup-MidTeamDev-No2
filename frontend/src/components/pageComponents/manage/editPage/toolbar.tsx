import useToolbar from "../../../../hooks/useToolbar";
import { Type } from "../../../../types/block";
import "./toolbar.css"

type Props={
    handleBold: () => void;
    handleUnderline:()=>void;
    type?:Type;
    setType: (type: Type, index?: number | undefined) => void;
}

const Toolbar=({handleBold,handleUnderline,type,setType}:Props)=>{
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
            <select value={type ?? "paragraph"} onChange={(e)=>{setType(e.target.value as Type)}}>
                <option value="paragraph">テキスト</option>
                <option value="heading1">タイトル１</option>
                <option value="heading2">タイトル２</option>
            </select>
        </div>
    )
}

export default Toolbar;
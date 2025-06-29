import { blockTypes } from "../../../../constants/blockTypes";
import useToolbar from "../../../../hooks/useToolbar";
import { Type } from "../../../../types/block";
import "./toolbar.css"
import { motion, AnimatePresence } from "framer-motion";

type Props={
    handleBold: () => void;
    handleUnderline:()=>void;
    type?:Type;
    setType: (type: Type, index?: number | undefined) => void;
}

const Toolbar=({handleBold,handleUnderline,type,setType}:Props)=>{
    const {showToolbar,toolbarPosition} = useToolbar()

    return (
        <AnimatePresence>
            {showToolbar && (
                <motion.div
                    className="toolbar"
                    style={{
                    top: toolbarPosition.top,
                    left: toolbarPosition.left
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0,transition:{ duration: 0.2, delay: 0.2 } }}
                    exit={{ opacity: 0, y: 10,transition: { duration: 0.2, delay: 0 }  }}
                >
                    <button onClick={()=>handleBold()}>太字</button>
                    <button onClick={()=>handleUnderline()}>下線</button>
                    <select value={type} onChange={(e)=>{
                        const value = e.target.value as Type;
                        setType(value)
                        }}>
                        {blockTypes.map((block)=>(
                            <option value={block.type}>{block.label}</option>
                        ))}
                    </select>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Toolbar;
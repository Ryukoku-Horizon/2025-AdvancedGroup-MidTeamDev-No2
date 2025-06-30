import { useEffect, useState } from "react";
import { blockTypes } from "../../../../constants/blockTypes";
import { Colors } from "../../../../constants/colors";
import useToolbar from "../../../../hooks/useToolbar";
import { Color, Type } from "../../../../types/block";
import "./toolbar.css"
import { motion, AnimatePresence } from "framer-motion";

type Props={
    handleBold: () => void;
    handleUnderline:()=>void;
    type?:Type;
    setType: (type: Type, index?: number | undefined) => void;
    handleColor:(color:Color)=>void;
}

const Toolbar=({handleBold,handleUnderline,type,setType,handleColor}:Props)=>{
    const {showToolbar,toolbarPosition,setShowToolbar} = useToolbar();
    const [color,setColor] = useState<string>("")

    useEffect(()=>{
        setColor("")
    },[showToolbar])

    return (
        <AnimatePresence>
            {showToolbar && (
                <motion.div
                    className="toolbar absolute"
                    style={{
                    top: toolbarPosition.top - 80,
                    left: toolbarPosition.left - 20
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0,transition:{ duration: 0.2, delay: 0.2 } }}
                    exit={{ opacity: 0, y: 10,transition: { duration: 0.2, delay: 0 }  }}
                >
                    <button onClick={()=>{
                        handleBold();
                        setShowToolbar(false);
                        }}>太字</button>
                    <button onClick={()=>{
                        handleUnderline();
                        setShowToolbar(false);
                        }}>下線</button>
                    <select value={type} onChange={(e)=>{
                        const value = e.target.value as Type;
                        setType(value)
                        setShowToolbar(false)
                        }}>
                        {blockTypes.map((block)=>(
                            <option value={block.type}>{block.label}</option>
                        ))}
                    </select>
                    <select value={color} onChange={(e)=>{
                        const value = e.target.value as Color;
                        handleColor(value);
                        setColor(value)
                        setShowToolbar(false)
                    }}> 
                        <option value={""}>色</option>
                        {Colors.map((item)=>(
                            <option value={item.color}>{item.label}</option>
                        ))}
                    </select>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Toolbar;
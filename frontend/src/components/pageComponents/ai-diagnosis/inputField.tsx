import { motion } from "framer-motion";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";

type Props={
    response: (res: string) =>Promise<void>;
}

const InputField=({response}:Props)=>{
    const [IsComposing,setIsComposing] = useState(false)
    const [value,setValue] = useState("")

    const post=()=>{
        response(value)
        setValue("")
    }

    const handleKeyDown=(key:string)=>{
        if(IsComposing) return;
        if(key==="Enter"){
            post()
        }
    }

    return (
        <motion.label
            className={`search-bar`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            >
            <input
                type="text"
                className="search-input w-full"
                placeholder="ここに入力してください"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                onKeyDown={(e)=>{handleKeyDown(e.key)}}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
            />
            <button
            onClick={()=>post()}
             className="border-none bg-white py-0 px-1 pointer m-0">
                {/* @ts-ignore */}
                <FaArrowAltCircleUp size={30} />
            </button>
        </motion.label>
    )
}

export default InputField;
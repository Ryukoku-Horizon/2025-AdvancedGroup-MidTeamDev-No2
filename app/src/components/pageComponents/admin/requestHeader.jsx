import * as React from "react"
import { motion } from "framer-motion"

const RequestHeader=({setShowDetail,showDetail,name})=>{
    return (
        <div className="flex justify-between items-center pointer" onClick={() => setShowDetail(!showDetail)}>
            <p className="font-semibold">サークル名: {name}</p>

            <motion.span
            animate={{ rotate: showDetail ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xl"
            >
            ▶︎
            </motion.span>
        </div>
    )
}

export default RequestHeader;
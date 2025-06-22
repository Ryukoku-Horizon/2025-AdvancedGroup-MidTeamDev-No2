import { motion } from "framer-motion"

type Props={
    setShowDetail:(arg:boolean)=>void;
    showDetail:boolean;
    name:string;
}

const RequestHeader=({setShowDetail,showDetail,name}:Props)=>{
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
import { motion } from "framer-motion";

type Props={
    isStarted:boolean;
}

const PageTitle=({isStarted}:Props)=>{
    return (
        <motion.h2
            className="diagnosis-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
                opacity: 1, y: 0,
                translate:isStarted ? "0 -0%" : "0 150%"
                }}
            transition={{ delay: 0.2, duration: 0.5 }}
            >
            AIサークル診断
        </motion.h2>
    )
}

export default PageTitle;
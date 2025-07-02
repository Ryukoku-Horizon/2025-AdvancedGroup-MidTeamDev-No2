import { AnimatePresence,motion } from "framer-motion"

type Props={
    startLoad:boolean;
}

const PageTitle=({startLoad}:Props)=>{
    return (
        <AnimatePresence>
            {!startLoad && (
                <motion.div 
                key="title"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
                className="flex flex-col items-center justify-centers mt-6 pt-8">
                    <p className="font-xl bold mb-0">検索</p>
                    <p className="gray-2 font-2xl bold mt-0 mb-5">気になるサークルを簡単検索</p>
                </motion.div>)}
        </AnimatePresence>
    )
}

export default PageTitle;
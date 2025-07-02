import { AnimatePresence,motion } from "framer-motion";

type Props={
    isStarted:boolean;
    start:()=>void;
}

const InitScreen=({isStarted,start}:Props)=>{


    return (
        <AnimatePresence>
            {!isStarted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-16"
                >
                    <motion.p
                        className="diagnosis-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        >
                        簡単な質問に答えるだけで、あなたにぴったりのサークルを見つけます。
                    </motion.p>

                    <motion.button
                        className="start-diagnosis-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={()=>start()}
                        >
                        診断を始める
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default InitScreen;
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const HeroSection=()=>{
    return (
        <section className="hero-section">
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {["龍", "谷", "サ", "ー", "ク", "ル", "H", "u", "b", " "].map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: index * 0.125 }}
                        className="welcom-text"
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.p>
            <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
            >
                気になるサークルを簡単検索
            </motion.p>
            <motion.label
                className="search-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* @ts-ignore */}
                <FiSearch className="search-icon" size={28} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="サークルを検索：プログラミング、テニス、ダンス..."
                />
            </motion.label>
        </section>
    )
}

export default HeroSection;
import { motion } from "framer-motion";
import CommonSearchField from "../../common/textField/commonSerchField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection=()=>{
    const [value,setValue] = useState("")
    const navigate = useNavigate()

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
            <CommonSearchField value={value} onChange={(e)=>{setValue(e.target.value)}} onClick={()=>{
                if(value!=="")
                navigate("/search",{state:{keyword:value}})
            }} />
            <motion.div
                className="hero-cta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                >
                <a href="#circle-list" className="hero-button">
                    サークル一覧はこちら
                </a>
            </motion.div>
        </section>
    )
}

export default HeroSection;
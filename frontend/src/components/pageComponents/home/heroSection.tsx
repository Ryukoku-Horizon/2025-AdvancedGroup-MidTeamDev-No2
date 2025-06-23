import { motion } from "framer-motion"

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

          <motion.input
            className="search-input"
            placeholder="サークルを検索：プログラミング、テニス、ダンス..."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          />
        </section>
    )
}

export default HeroSection;
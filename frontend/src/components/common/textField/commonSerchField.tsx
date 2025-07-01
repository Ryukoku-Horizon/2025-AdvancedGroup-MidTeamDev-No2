import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import "./searchField.css"

type Props={
    className?:string;
    value:string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}

const CommonSearchField=({className,value,onChange}:Props)=>{
    return (
        <motion.label
            className={`search-bar ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            >
            <input
                type="text"
                className="search-input w-full"
                placeholder="サークルを検索：プログラミング、テニス、ダンス..."
                value={value}
                onChange={onChange}
            />
            <button className="border-none bg-white py-0 px-1 pointer m-0">
                {/* @ts-ignore */}
                <FiSearch className="search-icon" size={24} />
            </button>
        </motion.label>
    )
}

export default CommonSearchField;
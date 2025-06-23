import React, { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./toggle.css";

type Props = {
  title: string;
  children:ReactNode;
};

const CommonToggle: React.FC<Props> = ({ title,children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar-group">
  <div className="header" onClick={() => setIsOpen(!isOpen)}>
    <p>{title}</p>
    <motion.span
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="arrow"
    >
      ▶
    </motion.span>
  </div>

  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.ul
        className="group-links"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.ul>
    )}
  </AnimatePresence>
</div>

  );
};

export default CommonToggle;

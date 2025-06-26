import { useState } from "react";
import "./fqa.css"

const FQAItem = ({ question, answer }: { question: string; answer: string }) => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="fqa-border">
        <div className="fqa-header" onClick={() => setOpen(!open)}>
          <h3 className="fqa-question">{question}</h3>
          <span className={`fqa-icon ${open ? "open" : ""}`}>▼</span>
        </div>
        <div className={`fqa-answer-box ${open ? "open" : ""}`}>
          <p className="fqa-answer">{answer}</p>
        </div>
      </div>
    );
  };

export default FQAItem;
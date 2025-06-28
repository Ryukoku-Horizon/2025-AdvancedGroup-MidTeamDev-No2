import { useRef, useEffect } from "react";
import "./selecter.css";
import { Type } from "../../../../types/block";
import { blockTypes } from "../../../../constants/blockTypes";

type Props = {
  index: number;
  setType: (type: Type, index?: number) => void;
  isHover: boolean;
  addNewBlock: (i: number) => void;
  isEmpty:boolean;
  isOpen:boolean;
  setSelecterIndex: React.Dispatch<React.SetStateAction<number | null>>
};

const TypeSelecter = ({ index, setType, isHover,addNewBlock,isEmpty,isOpen,setSelecterIndex }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null); 

  const handleClick = () => {
    if(isEmpty){
      setSelecterIndex(index);
    }else{
      addNewBlock(index + 1);
      setSelecterIndex(index + 1)
    }
  };

  // セレクター外クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).classList.contains("dropdown-item")
      ) {
        setSelecterIndex(null);
      }
    };
  
    // useCapture = true を指定して、確実に捕捉
    document.addEventListener("mousedown", handleClickOutside, true);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);
  
  
  return (
    <div
      className="type-selecter-container relative"
      ref={containerRef} 
    >
      <button
        className="border-none bg-white gray-3 font-l openButton"
        onClick={handleClick}
        style={{ opacity: isHover ? "100%" : "0%" }}
      >
        +
      </button>


      {isOpen && (
        <div
        className="dropdown">
          {blockTypes.map((block)=>(
            <div
            className="dropdown-item"
            onClick={() => {
              setTimeout(() => {
                setType(block.type, index);
                setSelecterIndex(null);
              }, 0);
            }}
          >
            {block.label}
          </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TypeSelecter;

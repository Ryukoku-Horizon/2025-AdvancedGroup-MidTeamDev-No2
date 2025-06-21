import * as React from "react"
import "./CommonTimeInput.css"; 

const formatTime = (input:string) => {
  // 空白2文字を除いて数字だけ取得
  const digits = input.replace(/\s/g, "");

  const hours = digits.slice(0, 2).padEnd(2, "0");
  const minutes = digits.slice(2, 4).padEnd(2, "0");

  return { hours, minutes };
};

type Props={
  input:string;
  setInput:React.Dispatch<React.SetStateAction<string>>;
}

const CommonTimeInput = ({
  input,
  setInput
}:Props) => {

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
  
    let digits = raw.replace(/\D/g, "").slice(0, 4);
  
    if (digits.length >= 1 && digits[0] !== "0" && digits[0] !== "1" && digits[0] !== "2") return;
  
    if (digits.length >= 3 && !"012345".includes(digits[2])) return;
  
    if (raw.length === 2 && digits==="2") {
      setInput(digits + "  ");
    }else if(raw.length===4 && digits==="2"){
      setInput(digits[0])
    } else if (digits.length > 2) {
      setInput(digits.slice(0, 2) + "  " + digits.slice(2));
    } else {
      setInput(digits);
    }
  };
  

  const { hours, minutes } = formatTime(input);

  const renderDigit = (char:string, digitIndex:number, displayIndex:number) => {
    const digitCount = input.replace(/\D/g, "").length; // 数字だけの長さ
    const isActive = digitIndex < digitCount;
  
    return (
      <span key={displayIndex} className="digit-wrapper">
        <span className={isActive ? "text-strong" : "text-faint"}>{char}</span>
      </span>
    );
  };

  return (
    <div className="time-input-wrapper">
    <div className="time-display">
      {renderDigit(hours[0], 0, 0)}
      {renderDigit(hours[1], 1, 1)}
      <span className="colon">:</span>
      {renderDigit(minutes[0], 2, 2)}
      {renderDigit(minutes[1], 3, 3)}
    </div>
    <input
      className="time-input"
      type="text"
      value={input}
      onChange={handleChange}
      maxLength={6}
      inputMode="numeric"
    />
  </div>
  );
};

export default CommonTimeInput;

import * as React from "react";
import { useState } from "react";
import CommonTextarea from "../../common/textField/commonTextarea";

type Props={
  timeDetail:string
  setTimeDetail:(arg:string)=>void;
  dateType:string;
}

const TimeDetailInput = ({ timeDetail, setTimeDetail,dateType }:Props) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); 

  const validateEmail = (value:string) => {
    return value!=="";
  };

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsValid(true)
    setTimeDetail(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true); 
    setIsValid(validateEmail(timeDetail));
  };

  return (
    <CommonTextarea
      value={timeDetail}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={dateType === "monthly" ? "例：毎月２回 17時から19時まで" : "例：年に２、３回 不定期で活動"}
      required={true}
      label="活動時間の詳細"
      error={!isValid && touched}
      errMessage="この欄は必須です" name={""} disabled={false} rows={0}    />
  );
};

export default TimeDetailInput;

import * as React from "react";
import { useState } from "react";
import CommonTextarea from "../../common/textField/commonTextarea";

type Props={
  detail:string;
  setDetail:(arg:string)=>void;
}

const DetailInput = ({ detail, setDetail }:Props) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); 

  const validateEmail = (value:string) => {
    return value!=="";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsValid(true)
    setDetail(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true); 
    setIsValid(validateEmail(detail));
  };

  return (
    <CommonTextarea
      value={detail}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="活動内容"
      required={true}
      label="活動内容"
      error={!isValid && touched}
      errMessage="この欄は必須です" 
      name="detail" />
  );
};

export default DetailInput;

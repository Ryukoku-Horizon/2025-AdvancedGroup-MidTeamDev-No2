import * as React from "react";
import { useState } from "react";
import CommonTextarea from "../../common/textField/commonTextarea";

const DetailInput = ({ detail, setDetail }) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); 

  const validateEmail = (value) => {
    return value!=="";
  };

  const handleChange = (e) => {
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
    />
  );
};

export default DetailInput;

import * as React from "react";
import { useState } from "react";
import CommonInput from "../../common/textField/commonInput";

const NameInput = ({ name, setName }) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); 

  const validateEmail = (value) => {
    return value!=="";
  };

  const handleChange = (e) => {
    setIsValid(true)
    setName(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true); 
    setIsValid(validateEmail(name));
  };

  return (
    <CommonInput
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="サークル名"
        required={true}
        label="サークル名"
        error={!isValid && touched}
        errMessage="この欄は必須です"
    />
  );
};

export default NameInput;

import * as React from "react";
import { useState } from "react";
import CommonInput from "../../common/textField/commonInput";

type Props={
  name:string;
  setName:(arg:string)=>void;
}

const NameInput = ({ name, setName }:Props) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); 

  const validateEmail = (value:string) => {
    return value!=="";
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
        name="cirle-name"
    />
  );
};

export default NameInput;

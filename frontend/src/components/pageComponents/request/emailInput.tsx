import * as React from "react";
import { useState } from "react";
import CommonInput from "../../common/textField/commonInput";

type Props={
  email:string;
  setEmail:(arg:string)=>void;
}

const EmailInput = ({ email, setEmail }:Props) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); 

  const validateEmail = (value:string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(true)
    setEmail(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true); 
    setIsValid(validateEmail(email));
  };

  return (
    <CommonInput
      type="email"
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="メールアドレス"
      required={true}
      label="メールアドレス"
      error={!isValid && touched}
      errMessage={email === "" ? "この欄は必須です" : "正しい形式のメールアドレスを入力してください"} 
      name="email" />
  );
};

export default EmailInput;

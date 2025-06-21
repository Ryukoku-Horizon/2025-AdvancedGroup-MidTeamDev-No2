import * as React from "react";
import { useState } from "react";
import CommonInput from "../../common/textField/commonInput";

const PasswordInput = ({ input, setInput, error }) => {
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <CommonInput
        value={input}
        onChange={handleChange}
        placeholder="パスワード"
        required={true}
        label="パスワード"
        error={error}
        errMessage="パスワードが入力されていません"
    />
  );
};

export default PasswordInput;

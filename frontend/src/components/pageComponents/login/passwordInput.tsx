import CommonInput from "../../common/textField/commonInput";

type Props={
  input:string;
  setInput:(input:string)=>void;
  error:boolean;
  onEnterDown?:()=>void;
}

const PasswordInput = ({ input, setInput, error,onEnterDown }:Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleEnterDonw=(e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter" && onEnterDown){
      onEnterDown();
    }
  }

  return (
    <CommonInput
      value={input}
      onChange={handleChange}
      placeholder="パスワード"
      required={true}
      label="パスワード"
      error={error}
      errMessage="パスワードが入力されていません"
      type="password"
      name={""}
      onBlur={undefined}
      onKeyDown={handleEnterDonw} />
  );
};

export default PasswordInput;

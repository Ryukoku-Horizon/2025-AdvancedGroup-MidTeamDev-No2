import CommonInput from "../../common/textField/commonInput";

const UserIdInput = ({ input, setInput,error }) => {

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <CommonInput
        value={input}
        onChange={handleChange}
        placeholder="ユーザーID"
        required={true}
        label="ユーザーID"
        error={error}
        errMessage="ユーザーIDが入力されていません"
    />
  );
};

export default UserIdInput;

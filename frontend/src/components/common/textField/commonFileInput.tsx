import { useRef, useState } from "react";
import "./fileInput.css";

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  circleImage:string;
};

const CommonFileInput = ({ setFile,circleImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(circleImage!=="" ? circleImage : "/no-image.png");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden-file-input"
      />
        <div className="circle-cover-wrapper clickable" onClick={handleClick}>
            <img
            src={
                previewUrl
            ? previewUrl
            : "/no-image.png" 
            }
            alt={`カバー画像`}
            className="circle-cover"
            />
            <span>{fileName ? "" : "クリックすると画像を選択できます"}</span>
        </div>
    </>
  );
};

export default CommonFileInput;

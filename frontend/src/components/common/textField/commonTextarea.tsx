import * as React from "react";
import './CommonInput.css'; 

type Props={
  label:string;
  name:string;
  value:string;
  onChange:React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?:string;
  required?:boolean;
  error?:boolean;
  errMessage:string;
  disabled?:boolean;
  rows?:number;
  onBlur:React.FocusEventHandler<HTMLTextAreaElement>;
}

const CommonTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error=false,
  errMessage,
  disabled = false,
  rows = 4,
  onBlur
}:Props) => {
  return (
    <div className="input-group w-full">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}{required && ' *'}
        </label>
      )}
      <textarea
        className={`input-field ${error ? 'input-error' : ''}`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        onBlur={onBlur}
      />
      {error && <p className="input-error-message">{errMessage}</p>}
    </div>
  );
};

export default CommonTextarea;

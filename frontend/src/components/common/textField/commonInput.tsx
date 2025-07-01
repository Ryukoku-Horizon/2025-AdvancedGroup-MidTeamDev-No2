import * as React from "react";
import './CommonInput.css'; 

type Props={
  value:string;
  label:string;
  name:string;
  onChange:React.ChangeEventHandler<HTMLInputElement> | undefined;
  required?:boolean;
  error?:boolean;
  disabled?:boolean;
  errMessage:string;
  onBlur:React.FocusEventHandler<HTMLInputElement> | undefined;
  placeholder?:string;
  type?:string;
  className?:string;
}

const CommonInput= ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error=false,
  disabled = false,
  onBlur,
  errMessage,
  className
}:Props) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}{required && ' *'}
        </label>
      )}
      <input
        className={`input-field ${error ? 'input-error' : ''}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
      />
      {error && <p className="input-error-message">{errMessage}</p>}
    </div>
  );
};

export default CommonInput;

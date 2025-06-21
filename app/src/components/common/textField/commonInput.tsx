// components/CommonInput.tsx
import React from 'react';
import './CommonInput.css'; 

type Props={
  value:string;
  label:string;
  name:string;
  onChange:()=>void;
  required:boolean;
  error:boolean;
  disabled:boolean;
  errMessage:string;
  onBlur:()=>void;
  placeholder:string;
  type:string;
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
  errMessage
}:Props) => {
  return (
    <div className="input-group">
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

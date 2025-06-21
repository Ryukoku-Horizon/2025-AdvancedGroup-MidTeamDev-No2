// components/CommonInput.tsx
import React from 'react';
import './CommonInput.css'; // CSSを読み込み

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
}) => {
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

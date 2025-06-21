// components/CommonTextarea.tsx
import React from 'react';
import './CommonInput.css'; // 共通のスタイルを流用

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
}) => {
  return (
    <div className="input-group">
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

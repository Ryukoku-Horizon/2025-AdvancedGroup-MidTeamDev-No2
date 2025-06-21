// components/CommonSelect.tsx
import React from 'react';
import './CommonInput.css'; // 共通のスタイルを使う

const CommonSelect= ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = '選択してください',
  required = false,
  error=false,
  disabled = false,
  errMessage
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}{required && ' *'}
        </label>
      )}
      <select
        className={`input-field ${error ? 'input-error' : ''}`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="input-error-message">{errMessage}</p>}
    </div>
  );
};

export default CommonSelect;

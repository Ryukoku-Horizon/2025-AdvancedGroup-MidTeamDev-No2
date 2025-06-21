import React from 'react';
import './CommonInput.css'; 

const CommonCheckbox = ({
    value,
    label,
    name,
    checked,
    onChange,
    required = false,
    error=false,
    disabled = false,
    errMessage
}) => {
  return (
    <div className="checkbox-group">
      <label className="checkbox-label">
        <input
            value={value}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`checkbox-input ${error ? 'input-error' : ''}`}
        />
        {label && <span className="checkbox-text">{label}{required && ' *'}</span>}
      </label>
      {error && <p className="input-error-message">{errMessage}</p>}
    </div>
  );
};

export default CommonCheckbox;

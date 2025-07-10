import React from 'react';


const baseInputClasses = "w-full bg-discord-dark text-discord-text border border-discord-primary px-4 py-2 rounded-md font-pixel placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-discord-accent focus:border-transparent";


export const Input = ({
  label,
  type = 'text',
  name,
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  labelClass = '',
  ...props
}) => {
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';
  const inputId = id || name;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={inputId} className={`block text-sm font-pixel text-discord-text mb-1 ${labelClass}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseInputClasses} ${errorClass}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-pixel">
          {error}
        </p>
      )}
    </div>
  );
};


export const Textarea = ({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  className = '',
  labelClass = '',
  ...props
}) => {
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';
  const textareaId = id || name;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className={`block text-sm font-pixel text-discord-text mb-1 ${labelClass}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={name}
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${baseInputClasses} ${errorClass}`}
        {...props}
      ></textarea>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-pixel">
          {error}
        </p>
      )}
    </div>
  );
};


export const Checkbox = ({
  label,
  name,
  id,
  checked,
  onChange,
  error,
  className = '',
  labelClass = '',
  ...props
}) => {
  const checkboxId = id || name;

  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <input
        type="checkbox"
        name={name}
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-discord-primary rounded border-gray-300 focus:ring-discord-accent bg-discord-dark border-discord-primary"
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className={`ml-2 text-sm font-pixel text-discord-text ${labelClass}`}>
          {label}
        </label>
      )}
      {error && (
        <p className="ml-4 mt-1 text-xs text-red-500 font-pixel">
          {error}
        </p>
      )}
    </div>
  );
};


export const Radio = ({
  label,
  name,
  id,
  value,
  checked,
  onChange,
  className = '',
  labelClass = '',
  ...props
}) => {
  const radioId = id || name;

  return (
    <div className={`flex items-center mb-2 ${className}`}>
      <input
        type="radio"
        name={name}
        id={radioId}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 text-discord-primary border-gray-300 focus:ring-discord-accent bg-discord-dark border-discord-primary"
        {...props}
      />
      {label && (
        <label htmlFor={radioId} className={`ml-2 text-sm font-pixel text-discord-text ${labelClass}`}>
          {label}
        </label>
      )}
    </div>
  );
};

export const Select = ({
  label,
  name,
  id,
  value,
  onChange,
  options, 
  error,
  required = false,
  className = '',
  labelClass = '',
  ...props
}) => {
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';
  const selectId = id || name;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={selectId} className={`block text-sm font-pixel text-discord-text mb-1 ${labelClass}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseInputClasses} appearance-none pr-8 cursor-pointer ${errorClass}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
  
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-discord-accent">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-pixel">
          {error}
        </p>
      )}
    </div>
  );
};

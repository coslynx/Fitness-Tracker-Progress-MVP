import React, { useState, useEffect, ChangeEvent } from 'react';
import { InputProps } from '@/lib/types/input';

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
  required = false,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(value ?? '');

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={label} className="block mb-2 text-gray-700 font-bold">
          {label}
        </label>
      )}
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={`block w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50 ${
          error ? 'border-red-500' : ''
        } ${disabled ? 'cursor-not-allowed bg-gray-200' : ''}`}
        required={required}
        disabled={disabled}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;
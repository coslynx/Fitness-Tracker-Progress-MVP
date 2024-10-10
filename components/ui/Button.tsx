import React from 'react';
import { ButtonProps } from '@/lib/types/button';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  onClick, 
  disabled = false,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  ...props 
}) => {
  const buttonClasses = `
    inline-flex
    items-center
    justify-center
    px-4
    py-2
    border
    rounded-md
    font-medium
    text-sm
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${variant === 'primary' ? 'bg-blue-500 text-white' : ''}
    ${variant === 'secondary' ? 'bg-gray-300 text-gray-700' : ''}
    ${variant === 'danger' ? 'bg-red-500 text-white' : ''}
    ${size === 'small' ? 'text-xs px-2 py-1' : ''}
    ${size === 'large' ? 'text-lg px-6 py-3' : ''}
    ${className}
  `;

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={buttonClasses} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
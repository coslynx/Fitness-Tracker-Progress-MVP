import { useState } from 'react';

interface SelectProps<T> {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps<any>> = ({ label, options, value, onChange, placeholder = 'Select an option', className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleClick = (option: any) => {
    onChange(option);
    handleClose();
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="select" className="block mb-2 text-gray-700 font-bold">
        {label}
      </label>
      <div
        className="relative"
        onClick={handleOpen}
        onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="block w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50">
          {value ? value : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md"
          role="listbox"
          aria-labelledby="select"
        >
          {options.map((option: any) => (
            <li
              key={option}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(option)}
              role="option"
              aria-selected={value === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
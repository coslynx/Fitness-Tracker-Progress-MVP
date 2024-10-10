import { useState, useEffect } from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'gray' }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulated loading time

    return () => clearTimeout(timeout);
  }, []);

  const spinnerClasses = `
    animate-spin
    rounded-full
    h-${size === 'small' ? '4' : size === 'medium' ? '8' : '12'}
    w-${size === 'small' ? '4' : size === 'medium' ? '8' : '12'}
    border-${color}-500
    border-t-transparent
    border-4
  `;

  return (
    <div className={`relative ${isLoading ? spinnerClasses : 'hidden'}`} />
  );
};

export default Spinner;
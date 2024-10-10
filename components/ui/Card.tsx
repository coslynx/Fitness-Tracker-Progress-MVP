import React from 'react';
import { CardProps } from '@/lib/types/card';

const Card: React.FC<CardProps> = ({ children, className, title, ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`} {...props}>
      {title && (
        <h2 className="text-xl font-bold mb-2">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
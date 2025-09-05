import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = true,
  hover = false
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-200';
  const paddingStyles = padding ? 'p-6' : '';
  const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  return (
    <div className={`${baseStyles} ${paddingStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
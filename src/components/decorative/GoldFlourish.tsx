import React from 'react';

interface GoldFlourishProps {
  className?: string;
  rotate?: number;
  variant?: 'primary' | 'secondary';
}

export const GoldFlourish: React.FC<GoldFlourishProps> = ({ 
  className = "", 
  rotate = 0,
  variant = 'primary'
}) => (
  <svg 
    className={`${className} transform ${rotate ? `rotate-${rotate}` : ''}`}
    viewBox="0 0 200 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20 50C40 50 60 20 100 20C140 20 160 50 180 50C160 50 140 80 100 80C60 80 40 50 20 50Z"
      className={`${
        variant === 'primary' 
          ? 'stroke-gold-600 dark:stroke-gold-400' 
          : 'stroke-gold-400 dark:stroke-gold-600'
      } transition-colors duration-300`}
      strokeWidth="2"
      fill="none"
    />
    <path 
      d="M100 20C110 30 120 40 140 40C120 40 110 30 100 20Z"
      className={`${
        variant === 'primary' 
          ? 'fill-gold-600/20 dark:fill-gold-400/20' 
          : 'fill-gold-400/20 dark:fill-gold-600/20'
      } transition-colors duration-300`}
    />
    <path 
      d="M100 80C90 70 80 60 60 60C80 60 90 70 100 80Z"
      className={`${
        variant === 'primary' 
          ? 'fill-gold-600/20 dark:fill-gold-400/20' 
          : 'fill-gold-400/20 dark:fill-gold-600/20'
      } transition-colors duration-300`}
    />
  </svg>
); 
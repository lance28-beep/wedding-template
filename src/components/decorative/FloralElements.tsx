import React from 'react';

interface DecorationProps {
  className?: string;
  rotate?: number;
  variant?: 'primary' | 'secondary' | 'accent';
}

// Enhanced wedding-themed decorative elements
export const FloralDecoration: React.FC<DecorationProps> = ({ className = "", rotate = 0, variant = 'primary' }) => (
  <svg 
    className={`${className} transform rotate-${rotate}`}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main flower petals */}
    <path 
      d="M50 10C45 20 40 25 30 30C40 35 45 40 50 50C55 40 60 35 70 30C60 25 55 20 50 10Z" 
      className="stroke-gold-200/30 dark:stroke-gold-300/30 fill-none"
      strokeWidth="1"
    />
    <path 
      d="M20 50C25 45 30 40 35 30C40 40 45 45 50 50C45 55 40 60 35 70C30 60 25 55 20 50Z" 
      className="stroke-gold-200/25 dark:stroke-gold-300/25 fill-none"
      strokeWidth="1"
    />
    <path 
      d="M80 50C75 45 70 40 65 30C60 40 55 45 50 50C55 55 60 60 65 70C70 60 75 55 80 50Z" 
      className="stroke-gold-200/25 dark:stroke-gold-300/25 fill-none"
      strokeWidth="1"
    />
    <path 
      d="M50 90C45 80 40 75 30 70C40 65 45 60 50 50C55 60 60 65 70 70C60 75 55 80 50 90Z" 
      className="stroke-gold-200/30 dark:stroke-gold-300/30 fill-none"
      strokeWidth="1"
    />
    
    {/* Decorative center */}
    <circle 
      cx="50" 
      cy="50" 
      r="5" 
      className="stroke-gold-300/40 dark:stroke-gold-400/40 fill-none"
      strokeWidth="1.5"
    />
    
    {/* Elegant swirls */}
    <path 
      d="M50 15C40 25 35 35 40 45C45 55 55 55 60 45C65 35 60 25 50 15" 
      className={`${variant === 'primary' ? 'stroke-gold-200/20 dark:stroke-gold-300/20' : 
                   variant === 'secondary' ? 'stroke-navy-200/15 dark:stroke-navy-300/15' : 
                   'stroke-white/15 dark:stroke-white/10'}`}
      fill="none"
      strokeWidth="1"
    />
    <path 
      d="M50 85C40 75 35 65 40 55C45 45 55 45 60 55C65 65 60 75 50 85" 
      className={`${variant === 'primary' ? 'stroke-gold-200/20 dark:stroke-gold-300/20' : 
                   variant === 'secondary' ? 'stroke-navy-200/15 dark:stroke-navy-300/15' : 
                   'stroke-white/15 dark:stroke-white/10'}`}
      fill="none"
      strokeWidth="1"
    />
  </svg>
);

export const LeafDecoration: React.FC<DecorationProps> = ({ className = "", rotate = 0, variant = 'primary' }) => (
  <svg 
    className={`${className} transform rotate-${rotate}`}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main leaves */}
    <path 
      d="M50 10C30 30 20 50 30 70C40 90 60 90 70 70C80 50 70 30 50 10Z" 
      className={`${variant === 'primary' ? 'fill-gold-200/20 dark:fill-gold-300/20' : 
                   variant === 'secondary' ? 'fill-navy-200/15 dark:fill-navy-300/15' : 
                   'fill-white/15 dark:fill-white/8'}`}
    />
    <path 
      d="M30 30C20 50 30 70 50 90C70 70 80 50 70 30C50 10 30 30 30 30Z" 
      className={`${variant === 'primary' ? 'fill-gold-200/15 dark:fill-gold-300/15' : 
                   variant === 'secondary' ? 'fill-navy-200/10 dark:fill-navy-300/10' : 
                   'fill-white/10 dark:fill-white/5'}`}
    />
    
    {/* Decorative veins */}
    <path 
      d="M50 10L50 90" 
      className={`${variant === 'primary' ? 'stroke-gold-300/30 dark:stroke-gold-400/30' : 
                   variant === 'secondary' ? 'stroke-navy-300/20 dark:stroke-navy-400/20' : 
                   'stroke-white/20 dark:stroke-white/15'}`}
      strokeWidth="0.5"
    />
    <path 
      d="M50 50C30 30 25 20 20 15" 
      className={`${variant === 'primary' ? 'stroke-gold-300/20 dark:stroke-gold-400/20' : 
                   variant === 'secondary' ? 'stroke-navy-300/15 dark:stroke-navy-400/15' : 
                   'stroke-white/15 dark:stroke-white/10'}`}
      strokeWidth="0.5"
    />
    <path 
      d="M50 50C70 30 75 20 80 15" 
      className={`${variant === 'primary' ? 'stroke-gold-300/20 dark:stroke-gold-400/20' : 
                   variant === 'secondary' ? 'stroke-navy-300/15 dark:stroke-navy-400/15' : 
                   'stroke-white/15 dark:stroke-white/10'}`}
      strokeWidth="0.5"
    />
  </svg>
);

// New decorative elements
export const WeddingRings: React.FC<DecorationProps> = ({ className = "", rotate = 0, variant = 'primary' }) => (
  <svg 
    className={`${className} transform rotate-${rotate}`}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* First ring */}
    <circle 
      cx="40" 
      cy="50" 
      r="20" 
      className={`${variant === 'primary' ? 'stroke-gold-200/30 dark:stroke-gold-300/30' : 
                   variant === 'secondary' ? 'stroke-navy-200/20 dark:stroke-navy-300/20' : 
                   'stroke-white/20 dark:stroke-white/15'}`}
      strokeWidth="2"
      fill="none"
    />
    {/* Second ring */}
    <circle 
      cx="60" 
      cy="50" 
      r="20" 
      className={`${variant === 'primary' ? 'stroke-gold-200/30 dark:stroke-gold-300/30' : 
                   variant === 'secondary' ? 'stroke-navy-200/20 dark:stroke-navy-300/20' : 
                   'stroke-white/20 dark:stroke-white/15'}`}
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const HeartLace: React.FC<DecorationProps> = ({ className = "", rotate = 0, variant = 'primary' }) => (
  <svg 
    className={`${className} transform rotate-${rotate}`}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Heart shape */}
    <path 
      d="M50 80C50 80 80 60 80 35C80 20 65 15 50 30C35 15 20 20 20 35C20 60 50 80 50 80Z" 
      className={`${variant === 'primary' ? 'fill-gold-200/20 dark:fill-gold-300/20' : 
                   variant === 'secondary' ? 'fill-navy-200/15 dark:fill-navy-300/15' : 
                   'fill-white/15 dark:fill-white/8'}`}
    />
    {/* Decorative lace pattern */}
    <path 
      d="M50 75C50 75 75 60 75 40C75 30 65 25 50 35C35 25 25 30 25 40C25 60 50 75 50 75" 
      className={`${variant === 'primary' ? 'stroke-gold-300/30 dark:stroke-gold-400/30' : 
                   variant === 'secondary' ? 'stroke-navy-300/20 dark:stroke-navy-400/20' : 
                   'stroke-white/20 dark:stroke-white/15'}`}
      strokeWidth="0.5"
      fill="none"
    />
  </svg>
); 
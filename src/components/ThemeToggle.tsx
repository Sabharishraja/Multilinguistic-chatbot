import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center rounded-lg
        bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700
        text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800
        ${sizeClasses[size]} ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative overflow-hidden">
        <Sun 
          className={`
            ${iconSizes[size]} transition-all duration-500 ease-in-out
            ${theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75 absolute'
            }
          `}
        />
        <Moon 
          className={`
            ${iconSizes[size]} transition-all duration-500 ease-in-out
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75 absolute'
            }
          `}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;

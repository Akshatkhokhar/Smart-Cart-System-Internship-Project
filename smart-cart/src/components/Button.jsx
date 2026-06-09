import { memo } from 'react';

const variants = {
  primary: 'bg-amazon-yellow hover:bg-amazon-yellow-hover text-black border border-yellow-400 shadow-sm',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600',
  danger: 'bg-red-500 hover:bg-red-600 text-white border border-red-600',
  outline: 'border border-amazon-orange text-amazon-orange hover:bg-amazon-orange hover:text-white',
  ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  cta: 'bg-amazon-orange hover:bg-amazon-orange-light text-white border border-amazon-orange shadow-sm',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

function Button({ children, variant = 'primary', size = 'md', disabled = false, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`amazon-btn ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);

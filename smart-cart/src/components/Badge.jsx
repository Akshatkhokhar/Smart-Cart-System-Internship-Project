import { memo } from 'react';

const variants = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  deal: 'bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5',
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded ${variants[variant]} ${sizes[size] || ''} ${className}`}
    >
      {children}
    </span>
  );
}

export default memo(Badge);

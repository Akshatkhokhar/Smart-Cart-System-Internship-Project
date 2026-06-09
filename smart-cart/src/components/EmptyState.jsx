import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

function EmptyState({ icon, title, description, actionLabel, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      {icon && (
        <div className="text-6xl mb-6 text-gray-300 dark:text-gray-600">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button variant="primary" size="lg">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}

export default memo(EmptyState);

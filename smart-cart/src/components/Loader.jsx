import { memo } from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-[3px] border-gray-200 dark:border-gray-700 border-t-amazon-orange rounded-full animate-spin"></div>
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-3 w-1/5" />
        <Skeleton className="h-8 w-full rounded" />
      </div>
    </div>
  );
}

export { Skeleton, ProductCardSkeleton };
export default memo(Loader);

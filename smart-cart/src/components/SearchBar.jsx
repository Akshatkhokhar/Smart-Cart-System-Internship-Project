import { memo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/slices/productsSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  const handleChange = useCallback((e) => {
    dispatch(setSearchQuery(e.target.value));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch(setSearchQuery(''));
    inputRef.current?.focus();
  }, [dispatch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full pl-9 pr-9 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange transition-colors text-sm"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default memo(SearchBar);

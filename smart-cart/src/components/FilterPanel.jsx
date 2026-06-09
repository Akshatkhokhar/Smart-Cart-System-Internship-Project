import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSortBy, selectCategories } from '../redux/slices/productsSlice';

function FilterPanel() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const sortBy = useSelector((state) => state.products.sortBy);
  const categories = useSelector(selectCategories);

  const handleCategoryChange = useCallback((cat) => {
    dispatch(setSelectedCategory(cat));
  }, [dispatch]);

  const handleSortChange = useCallback((e) => {
    dispatch(setSortBy(e.target.value));
  }, [dispatch]);

  const categoryOptions = useMemo(() => categories, [categories]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-150 ${
              selectedCategory === 'all'
                ? 'bg-amazon-orange text-white border-amazon-orange'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-amazon-orange hover:text-amazon-orange'
            }`}
          >
            All
          </button>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-150 ${
                selectedCategory === cat
                  ? 'bg-amazon-orange text-white border-amazon-orange'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-amazon-orange hover:text-amazon-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="sm:w-44">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange transition-colors"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default memo(FilterPanel);

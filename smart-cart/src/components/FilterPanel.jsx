import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSortBy, selectCategories } from '../redux/slices/productsSlice';

function FilterPanel() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const sortBy = useSelector((state) => state.products.sortBy);
  const categories = useSelector(selectCategories);

  const handleCategoryChange = useCallback((e) => {
    dispatch(setSelectedCategory(e.target.value));
  }, [dispatch]);

  const handleSortChange = useCallback((e) => {
    dispatch(setSortBy(e.target.value));
  }, [dispatch]);

  const categoryOptions = useMemo(() => categories, [categories]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
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

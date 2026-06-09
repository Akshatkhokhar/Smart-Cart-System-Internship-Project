import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../data/products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsData,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setSortBy } = productsSlice.actions;

export const selectFilteredProducts = (state) => {
  const { items, searchQuery, selectedCategory, sortBy } = state.products;

  let filtered = [...items].filter(p => p.stock > 0);

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return filtered;
};

export const selectCategories = (state) => {
  const categories = state.products.items.map(p => p.category);
  return [...new Set(categories)];
};

export default productsSlice.reducer;

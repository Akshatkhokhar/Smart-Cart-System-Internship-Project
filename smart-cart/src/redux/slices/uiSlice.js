import { createSlice } from '@reduxjs/toolkit';

function loadTheme() {
  try {
    const saved = localStorage.getItem('smartcart_theme');
    return saved || 'light';
  } catch {
    return 'light';
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('smartcart_theme', theme);
  } catch {
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: loadTheme() === 'dark',
    loading: false,
    cartDiscountEnabled: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      saveTheme(state.darkMode ? 'dark' : 'light');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleCartDiscount: (state) => {
      state.cartDiscountEnabled = !state.cartDiscountEnabled;
    },
  },
});

export const { toggleDarkMode, setLoading, toggleCartDiscount } = uiSlice.actions;
export const selectDarkMode = (state) => state.ui.darkMode;
export const selectCartDiscountEnabled = (state) => state.ui.cartDiscountEnabled;
export default uiSlice.reducer;

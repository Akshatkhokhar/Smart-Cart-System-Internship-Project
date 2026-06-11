import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});

export default store;

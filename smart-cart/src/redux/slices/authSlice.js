import { createSlice } from '@reduxjs/toolkit';

const getUsers = () => {
  try {
    const data = localStorage.getItem('smartcart_users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const getCurrentUser = () => {
  try {
    const data = localStorage.getItem('smartcart_current_user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getCurrentUser(),
  isAuthenticated: !!getCurrentUser(),
  users: getUsers(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const existing = state.users.find((u) => u.email === email);
      if (existing) {
        return;
      }
      const newUser = { id: Date.now().toString(), name, email, password };
      state.users.push(newUser);
      state.user = { id: newUser.id, name: newUser.name, email: newUser.email };
      state.isAuthenticated = true;
      localStorage.setItem('smartcart_users', JSON.stringify(state.users));
      localStorage.setItem('smartcart_current_user', JSON.stringify(state.user));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const found = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        return;
      }
      state.user = { id: found.id, name: found.name, email: found.email };
      state.isAuthenticated = true;
      localStorage.setItem('smartcart_current_user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('smartcart_current_user');
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;

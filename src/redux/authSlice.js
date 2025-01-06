import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    registeredUsers: [],
    currentUser: null, 
  },
  reducers: {
    register: (state, action) => {
      const { email } = action.payload;
      const isAlreadyRegistered = state.registeredUsers.some(user => user.email === email);
      if (!isAlreadyRegistered) {
        state.registeredUsers.push(action.payload); 
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.registeredUsers.find(user => user.email === email && user.password === password);
      if (user) {
        state.isLoggedIn = true;
        state.currentUser = user;
      } else {
        state.isLoggedIn = false;
        state.currentUser = null;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;

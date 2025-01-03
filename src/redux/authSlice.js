import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    registeredUsers: [], // Store signed-up users
    currentUser: null, // Store the currently logged-in user
  },
  reducers: {
    register: (state, action) => {
      const { email } = action.payload;
      // Check if the user is already registered
      const isAlreadyRegistered = state.registeredUsers.some(user => user.email === email);
      if (!isAlreadyRegistered) {
        state.registeredUsers.push(action.payload); // Add user to registered list
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      // Check if user exists and credentials match
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

// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';   // Import post slice reducer
import authReducer from './authSlice';   // If using authentication reducer

const store = configureStore({
  reducer: {
    posts: postReducer,  // Add postReducer to the store
    auth: authReducer,   // If you're using authReducer for user login status
  },
});

export default store;  // Make sure to export the store as default

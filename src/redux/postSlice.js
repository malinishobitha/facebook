import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload); // New post add
    },
    likePost: (state, action) => {
      state.posts[action.payload].likes += 1; // Like count increment
    },
    addComment: (state, action) => {
      const { index, comment } = action.payload;
      state.posts[index].comments.push(comment); // Comment add
    },
    deletePost: (state, action) => {
      state.posts.splice(action.payload, 1); // Specific post delete
    },
  
  },
});

export const { addPost, likePost, addComment, deletePost, clearPosts } =
  postSlice.actions;
export default postSlice.reducer;

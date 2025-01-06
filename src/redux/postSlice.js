import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    likePost: (state, action) => {
      const post = state.posts[action.payload];
      if (post) {
        post.likes += 1; 
      }
    },
    dislikePost: (state, action) => {
      const post = state.posts[action.payload];
      if (post) {
        post.dislikes += 1; 
      }
    },
    addComment: (state, action) => {
      const { index, comment } = action.payload;
      const post = state.posts[index];
      if (post) {
        post.comments.push(comment);
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addPost, likePost, dislikePost, addComment, deletePost } = postSlice.actions;
export default postSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { data } from '../data';

export const postSlice = createSlice({
  name: 'posts',
  initialState: data,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    editPost: (state, action) => {
      const { id, ...rest } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        Object.assign(existingPost, rest);
      }
    },
  },
});

export const { addPost, editPost } = postSlice.actions;

export default postSlice.reducer;

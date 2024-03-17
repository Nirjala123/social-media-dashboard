import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

export const postSlice = createSlice({
  name: "posts",
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
    deletePost: (state, action) => {
      const id = action.payload;
      return state.filter((post) => post.id !== id);
    },
  },
});

export const { addPost, editPost, deletePost } = postSlice.actions;

export default postSlice.reducer;

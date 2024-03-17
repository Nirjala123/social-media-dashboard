// postReducer.ts

import { Post } from '../App'; // Import the Post interface
import { ADD_POST, DELETE_POST, EDIT_POST } from '../actions/types';

const initialState: Post[] = [];

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.payload];
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload);
    case EDIT_POST:
      return state.map(post =>
        post.id === action.payload.id ? { ...post, ...action.payload } : post
      );
    default:
      return state;
  }
};

export default postReducer; // Export postReducer as default export

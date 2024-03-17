import { ADD_POST, DELETE_POST, EDIT_POST } from './types';
import { Post } from '../App'; // Import the Post interface

export const addPost = (post: Post) => ({
  type: ADD_POST,
  payload: post,
});

export const deletePost = (id: number) => ({
  type: DELETE_POST,
  payload: id,
});

export const editPost = (post: Post) => ({
  type: EDIT_POST,
  payload: post,
});
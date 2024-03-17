import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from './actions/postActions';
import { deletePost, editPost } from './actions/postActions'; // Import editPost and deletePost actions
import { Provider } from 'react-redux';
import store from './store';
import Posts from './components/Posts';

// Define the shape of a Post object
export interface Post {
  id: number;
  caption: string;
  content: string;
  createdAt: string;
  image?: string;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts); // Fetch posts from Redux store

  const [caption, setCaption] = React.useState('');
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [editingPostId, setEditingPostId] = React.useState<number | null>(null); // Define editingPostId state

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPostId !== null) {
      // If editingPostId exists, update the post
      const updatedPost: Post = {
        id: editingPostId,
        caption,
        content,
        createdAt: new Date().toLocaleDateString(),
        image: image ? URL.createObjectURL(image) : undefined,
      };
      dispatch(editPost(updatedPost));
      setEditingPostId(null); // Reset editingPostId
    } else {
      // If editingPostId doesn't exist, create a new post
      const newPost: Post = {
        id: Date.now(),
        caption,
        content,
        createdAt: new Date().toLocaleDateString(),
        image: image ? URL.createObjectURL(image) : undefined,
      };
      dispatch(addPost(newPost));
    }
    setCaption('');
    setContent('');
    setImage(null);
  };

  const handleEdit = (id: number) => {
    // Set editingPostId when edit button is clicked
    setEditingPostId(id);
    const postToEdit = posts.find((post: Post) => post.id === id);
    if (postToEdit) {
      setCaption(postToEdit.caption);
      setContent(postToEdit.content);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <Provider store={store}>
      <div className="container">
        <header className="header">
          <h1>Social Media Dashboard</h1>
          <div className="header-buttons">
            <button className="add-friend-btn">Add Friend</button>
            <div className="account-dropdown">
              <button className="account-btn">Account Details</button>
              <div className="dropdown-content">
                <a href="#">Settings</a>
                <a href="#">Sign Out</a>
              </div>
            </div>
          </div>
        </header>
        <div className="body">
          <div className="post-list">
            <h2>Posts</h2>
            <ul>
              {posts.map((post: Post) => (
                <li key={post.id}>
                  <h3>{post.caption}</h3>
                  {post.image && <img src={post.image} alt="Post" />}
                  <p>{post.content}</p>
                  <p>{post.createdAt}</p>
                  {/* Edit button */}
                  <button className="edit-btn" onClick={() => handleEdit(post.id)}>
                    Edit
                  </button>
                  {/* Delete button */}
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="create-post">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Caption:</label>
                <input
                  type="text"
                  value={caption}
                  onChange={handleCaptionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Content:</label>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;

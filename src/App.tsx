import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

// Define the shape of a Post object
interface Post {
  id: number;
  caption: string;
  content: string;
  createdAt: string;
  image?: string;
}

// Define the functional component App
const App: React.FC = () => {
  // State variables using useState hook to manage posts, caption, content, image, and editingPostId
  const [posts, setPosts] = useState<Post[]>([]);
  const [caption, setCaption] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  // Event handler for caption input change
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  // Event handler for content textarea change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Event handler for image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPostId !== null) {
      // If editingPostId exists, update the existing post
      const updatedPosts = posts.map(post =>
        post.id === editingPostId
          ? {
              ...post,
              caption,
              content,
              image: image ? URL.createObjectURL(image) : post.image,
            }
          : post
      );
      setPosts(updatedPosts);
      setEditingPostId(null);
    } else {
      // If editingPostId doesn't exist, create a new post
      const newPost: Post = {
        id: Date.now(),
        caption,
        content,
        createdAt: new Date().toLocaleDateString(),
        image: image ? URL.createObjectURL(image) : undefined,
      };
      setPosts([newPost, ...posts]);
    }
    // Clear input fields and image state
    setCaption('');
    setContent('');
    setImage(null);
  };

  // Event handler for deleting a post
  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Event handler for editing a post
  const handleEdit = (id: number) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setEditingPostId(postToEdit.id);
      setCaption(postToEdit.caption);
      setContent(postToEdit.content);
    }
  };

  // JSX representing the structure of the UI
  return (
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
          <h2>Post List</h2>
          <ul>
            {/* Loop through posts array and display each post */}
            {posts.map(post => (
              <li key={post.id}>
                {/* If editingPostId matches current post id, display edit form */}
                {editingPostId === post.id ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {/* Display post details */}
                    <h3>{post.caption}</h3>
                    {post.image && <img src={post.image} alt="Post" />}
                    <p>{post.content}</p>
                    <p>{post.createdAt}</p>
                  </>
                )}
                {/* If editingPostId matches current post id, display save button, else display edit button */}
                {editingPostId === post.id ? (
                  <button
                    className="submit-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                )}
                {/* Button to delete the post */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Form to create a new post */}
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
            {/* Button to submit the new post */}
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the App component
export default App;

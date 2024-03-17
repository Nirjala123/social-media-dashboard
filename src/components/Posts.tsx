// Posts.tsx

import React from 'react';
import { Post } from '../App';

interface Props {
  posts: Post[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Posts: React.FC<Props> = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="post-list">
      <h2>Posts</h2>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <h3>{post.caption}</h3>
            {post.image && <img src={post.image} alt="Post" />}
            <p>{post.content}</p>
            <p>{post.createdAt}</p>
            <button
              className="edit-btn"
              onClick={() => onEdit(post.id)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

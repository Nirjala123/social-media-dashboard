import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import EditPostModal from './EditPostModal';
import { editPost } from '../slices/postsSlice';
import { Data } from '../data';

const PostList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState('');

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.posts);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId('');
  };

  const editHandler = (id: string) => {
    setEditId(id);
    setIsModalOpen(true);
  };

  const handleSubmitPost = (editedPost: Data) => {
    dispatch(editPost(editedPost));
  };

  return (
    <div className="space-y-4 min-w-[500px] bg-gray-200 flex flex-col items-center py-4 rounded-lg">
      {data.map((post, index) => (
        <div
          key={index}
          className="bg-white w-[90%] p-4 rounded-lg shadow space-y-2"
        >
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500">{post.dateOfCreation}</p>
          <button onClick={() => editHandler(post.id)}>Edit</button>
        </div>
      ))}
      <EditPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPost}
        id={editId}
      />
    </div>
  );
};

export default PostList;

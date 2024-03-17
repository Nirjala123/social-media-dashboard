import { useState } from 'react';
import CreatePostModal from './CreatePostModal';
import { Data } from '../data';
import { addPost } from '../slices/postsSlice';
import { useAppDispatch } from '../hooks';

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitPost = (newPost: Data) => {
    dispatch(addPost(newPost));
  };

  return (
    <div className="bg-gray-200 w-[25%] space-y-4 mr-4 p-5 rounded-lg mb-8 flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Make a new Post!</h1>
      <button onClick={handleOpenModal}>Create Post</button>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPost}
      />
    </div>
  );
};

export default CreatePost;

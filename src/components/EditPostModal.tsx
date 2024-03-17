import React, { useLayoutEffect, useState } from "react";
import { Data } from "../data";
import { useAppSelector } from "../hooks";

interface IModalData {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Data) => void;
}

const EditPostModal = ({ id, isOpen, onClose, onSubmit }: IModalData) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

  useLayoutEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id, title, content, dateOfCreation: new Date().toDateString() });
    setTitle("");
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full max-w-xs p-3 border-2 border-gray-300 rounded-md text-gray-500"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full max-w-xs p-3 border-2 border-gray-300 rounded-md text-gray-500"
            required
          ></textarea>
          <div className="flex justify-between items-center">
            <button>Done</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;

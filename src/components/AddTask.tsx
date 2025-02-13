import React, { useState } from "react";
import { Modal } from "antd"; // Only using Modal from Ant Design
import { axiosInstance } from "../api/api";
import { Categories } from "../lib/types";

interface AddTaskProps {
  categories: Categories; // List of categories passed as props
}

const AddTask: React.FC<AddTaskProps> = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!title || !selectedCategory) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      await axiosInstance.post("http://127.0.0.1:8000/api/tasks/", {
        title,
        description,
        category: selectedCategory,
      });
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setSelectedCategory(null);
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <>
      <button
        className="hover:bg-black/20 px-1 rounded"
        title="Add Task"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      <Modal
        title="Add Task"
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full p-2 border rounded"
              rows={3}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddTask;

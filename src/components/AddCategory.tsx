import React, { useState } from "react";
import { Modal } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { axiosInstance } from "../api/api";

const AddCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!category) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      await axiosInstance.post("http://127.0.0.1:8000/api/categories/", {
        name: category,
      });
      setIsModalOpen(false);
      setCategory("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <>
      <button
        className="hover:bg-black/20 px-1 rounded"
        title="Add Category"
        onClick={() => setIsModalOpen(true)}
      >
        <FolderAddOutlined />
      </button>
      <Modal
        title="Add Category"
        centered
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="title"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddCategory;

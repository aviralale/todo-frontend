import React, { useState } from "react";
import { Modal } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";

const AddCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <form></form>
      </Modal>
    </>
  );
};

export default AddCategory;

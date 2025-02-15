import React, { useState } from "react";
import { Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <button
        className="hover:bg-black/20 px-1 rounded"
        title="Logout"
        onClick={() => setIsModalOpen(true)}
      >
        <LogoutOutlined />
      </button>
      <Modal
        title="Are you sure you want to logout?"
        centered
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Click "OK" to confirm logout.</p>
      </Modal>
    </>
  );
};

export default Logout;

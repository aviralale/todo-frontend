import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import type { GetProps, TreeDataNode } from "antd";
import { Categories } from "../lib/types";
import { axiosInstance } from "../api/api";
import { useNavigate } from "react-router-dom";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;
const { DirectoryTree } = Tree;

const transformToTreeData = (categories: Categories): TreeDataNode[] => {
  return categories.map((category, index) => ({
    title: category.name,
    key: `${index}`,
    children: category.tasks.map((task) => ({
      title: task.title,
      key: `${index}-${task.id}`, // Key format: `${index}-${task.id}`
      isLeaf: true,
    })),
  }));
};

interface SidebarProps {
  categories?: Categories;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [categories, setCategories] = useState<Categories>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<Categories>(
          "http://127.0.0.1:8000/api/categories/user_categories/"
        );
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError("Authentication Required!");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const treeData = transformToTreeData(categories);

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);

    // Extract task.id from the selected node's key
    const selectedKey = keys[0] as string; // Get the first selected key
    if (selectedKey.includes("-")) {
      const taskId = selectedKey.split("-")[1]; // Split the key to get task.id
      navigate(`/tasks/${taskId}`); // Navigate to the task page
    }
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="uppercase">{error}</div>;
  }

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default Sidebar;

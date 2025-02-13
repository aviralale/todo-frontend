import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import type { GetProps, TreeDataNode } from "antd";
import { Categories } from "../lib/types";
import { axiosInstance, getName } from "../api/api";
import { useNavigate } from "react-router-dom";
import AddCategory from "./AddCategory";
import AddTask from "./AddTask";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;
const { DirectoryTree } = Tree;

const transformToTreeData = (categories: Categories): TreeDataNode[] => {
  return categories.map((category, index) => ({
    title: category.name,
    key: `${index}`,
    children: category.tasks.map((task) => ({
      title: task.title,
      key: `${index}-${task.id}`,
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
  const [currentUserName, setCurrentUserName] = useState<string | null>(null); // State for username
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch categories");
      setLoading(false);
    }
  };

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

    // Fetch the username
    const fetchUserName = async () => {
      try {
        const name = await getName(); // Await the Promise
        setCurrentUserName(name); // Set the username in state
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };

    fetchCategories();
    fetchUserName();
  }, []);

  const treeData = transformToTreeData(categories);

  const onSelect: DirectoryTreeProps["onSelect"] = (keys) => {
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
    <div className="min-h-screen flex flex-col group">
      <div className="sticky px-2  w-full bottom-0 flex justify-between">
        <p className="">
          Hi,{" "}
          <span className="font-semibold">{currentUserName || "Guest"}</span>!
        </p>
        <div className=" opacity-0 group-hover:opacity-100 flex">
          <AddTask categories={categories} />
          <AddCategory />
        </div>
      </div>
      <DirectoryTree
        multiple
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  );
};

export default Sidebar;

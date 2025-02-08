import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import type { GetProps, TreeDataNode } from "antd";
import { Categories } from "../lib/types";
import axios from "axios";

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
  categories?: Categories; // Made optional since we'll fetch data
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [categories, setCategories] = useState<Categories>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Categories>(
          "http://127.0.0.1:8000/api/categories/user_categories/"
        );
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch categories");
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
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

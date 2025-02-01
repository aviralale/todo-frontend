import React from "react";
import { ReactNode } from "react";
import { Flex, Splitter, Typography } from "antd";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: "100%" }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{ whiteSpace: "nowrap" }}
    >
      {props.text}
    </Typography.Title>
  </Flex>
);

const Layout = ({ children }: LayoutProps) => (
  <Splitter
    style={{ height: "100vh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
  >
    <Splitter.Panel defaultSize="15%" min="15%" max="50%">
      <Sidebar />
    </Splitter.Panel>
    <Splitter.Panel className="flex justify-center items-center">
      {children}
    </Splitter.Panel>
  </Splitter>
);

export default Layout;

import React from "react";
import { Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const NewMessage = () => {
  const column = [{}];
  const data = [
    {}
  ]
  return (
    <div>
      <MenuOutlined />
      <Table data={data} dataSource={column} />
    </div>
  );
}

export default NewMessage;
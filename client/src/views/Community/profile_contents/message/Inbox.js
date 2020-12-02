import React from "react";
import { Alert, Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const Inbox = () => {
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

export default Inbox;
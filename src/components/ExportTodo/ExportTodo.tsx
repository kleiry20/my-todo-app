import React from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";
import "../../App.less";

const ExportTodo = (props: any) => {
  return (
    <div>
      {" "}
      <CSVLink filename={"my-todo.csv"} target="_blank" data={props.taskArray}>
        <Button className="btn-design">Export All Todos</Button>
      </CSVLink>
    </div>
  );
};

export default ExportTodo;

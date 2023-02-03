import React from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";

const ExportTodo = (props: any) => {
  return (
    <div>
      {" "}
      <CSVLink filename={"my-todo.csv"} target="_blank" data={props.taskArray}>
        <Button>Export</Button>
      </CSVLink>
    </div>
  );
};

export default ExportTodo;

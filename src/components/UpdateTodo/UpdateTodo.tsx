import React from "react";
import { Button } from "antd";

function UpdateTodo(props: any): JSX.Element {
  const editTodo = (singleTaskObject: any, index: number) => {
    props.editTask(singleTaskObject, index);
  };

  return (
    <Button
      className="btn-group btn-design"
      onClick={() => {
        editTodo(props.singleTaskObject, props.index);
      }}
    >
      Update
    </Button>
  );
}

export default UpdateTodo;

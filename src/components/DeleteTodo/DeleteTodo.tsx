import React from "react";
import { Button } from "antd";
import axios from "axios";
import "../../App.less";

function DeleteTodo(props: any): JSX.Element {
  // const { taskArray, index, setTaskArray, singleTaskObjectId } = props;

  const url = "http://localhost:5000/todo/";

  const deleteTask = (index: number) => {
    axios
      .delete(`${url}${props.singleTaskObjectId}`)
      .then((response) => {
        let arr: string[] = props.taskArray;
        arr.splice(index, 1);
        props.setTaskArray([...arr]);
      })
      .catch((error) => {
        // element.parentElement.innerHTML = `Error: ${error.message}`;
        console.error("There was an error!", error);
      });
  };

  return (
    <Button
    
      className="btn-group btn-design"
      onClick={() => {
        deleteTask(props.index);
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteTodo;

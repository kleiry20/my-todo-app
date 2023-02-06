import { Button, notification } from "antd";
import axios from "axios";
import "../../App.less";

function DeleteTodo(props: any): JSX.Element {

  const url = "http://localhost:5000/todo/";

  const deleteTask = (index: number) => {
    axios
      .delete(`${url}${props.singleTaskObjectId}`)
      .then((response) => {
        let arr: string[] = props.taskArray;
        arr.splice(index, 1);
        props.setTaskArray([...arr]);
        notification.open({
          message: <div style={{ color: "#fff8ea" }}>Task Deleted!</div>,
          description: "Your task has been deleted!",
          style: {
            border: "2px solid #9E7676",
            backgroundColor: "#9E7676",
            color: "#fff8ea",
          },
          onClick: () => {
            console.log("Task Deleted!");
          },
        });
      })
      .catch((error) => {
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

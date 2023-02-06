import { Button, notification } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
        toast.success("Task Deleted!", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
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

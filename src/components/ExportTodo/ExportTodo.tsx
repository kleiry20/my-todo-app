import { Button, notification } from "antd";
import { CSVLink } from "react-csv";
import toast, { Toaster } from "react-hot-toast";
import "../../App.less";

const openNotification = () => {
  toast.success("Task Exported!", {
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
};
const ExportTodo = (props: any) => {
  return (
    <div>
      {" "}
      {props.taskArray !== undefined && props.taskArray.length > 0 ? (
        <CSVLink
          filename={"my-todo.csv"}
          target="_blank"
          data={props.taskArray}
        >
          <Button className="btn-design" onClick={openNotification}>
            Export All Todos
          </Button>
        </CSVLink>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExportTodo;

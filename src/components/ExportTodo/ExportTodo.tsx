import { Button, notification } from "antd";
import { CSVLink } from "react-csv";
import "../../App.less";

const openNotification = () => {
  notification.open({
    message: <div style={{ color: "#fff8ea" }}>Tasks Exported!</div>,
    description: "Your tasks have been exported!",
    style: {
      border: "2px solid #9E7676",
      backgroundColor: "#9E7676",
      color: "#fff8ea",
    },
    onClick: () => {
      console.log("Tasks Exported!");
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

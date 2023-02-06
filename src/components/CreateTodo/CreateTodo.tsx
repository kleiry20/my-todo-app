import React, { useState, useEffect } from "react";
import { Input, Button, Form, Row, Col, Alert, notification } from "antd";
import toast, { Toaster } from "react-hot-toast";
import ReadTodo from "../ReadTodo/ReadTodo";
import axios from "axios";
import "../../App.less";
import ExportTodo from "../ExportTodo/ExportTodo";
import ImportTodo from "../ImportTodo/ImportTodo";
import "./CreateTodo.less";

const CreateTodo = () => {
  const [task, setTask] = useState(""); // single task for input box
  const [taskArray, setTaskArray] = useState<JSON[]>([]); // array of tasks(object), in the backend [{}{}{}]
  const [itemindex, setItemIndex] = useState(0); // task index/id in frontend
  const [taskObjectId, setTaskObjectId] = useState(0); // task id from backend
  const [isupdate, setIsupdate] = useState(false); // to check when updating current or creating new
  const [fetchAllTodo, setFetchAllTodo] = useState(false); // to check if all todos are fetched

  const url = "http://localhost:5000/todo/";

  // getting all tasks/todos from backend and setting in taskArray
  useEffect(() => {
    axios
      .get(`${url}`)
      .then((response) => {
        const allTodos = response.data;
        setTaskArray(allTodos); // allTodos = array of objects [{}{}{}]
        // console.log("allTodos in apple", allTodos);
      })
      .catch((error) => {
        console.log(`error in parent: ${error}`);
      });
  }, [fetchAllTodo]);

  const handleChange = (e: any) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: any) => {
    if (isupdate) {
      // isupdate is true --> update the current task
      axios
        .put(`${url}${taskObjectId}`, {
          task: task,
        })
        .then((response) => {
          let tasks: JSON[] = taskArray; // tasks is a json array
          tasks.splice(itemindex, 1, response.data);
          setTaskArray(tasks);
          setTask("");
          setIsupdate(false);

          //   notification.open({
          //     message: <div style={{ color: "#fff8ea" }}>Task Updated!</div>,
          //     description: "Yay, your task has been updated!",
          //     className: "notification-design",
          //     style: {
          //       border: "2px solid #9E7676",
          //       backgroundColor: "#9E7676",
          //       color: "#fff8ea",
          //     },
          //     onClick: () => {
          //       console.log("Task Updated!");
          //     },
          //   });

          toast.success("Current Task Updated!", {
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
          toast.error("This didn't work.");
        });
    }
    // isupdate is false --> new task creation
    else {
      const response = axios
        .post("http://localhost:5000/todo", { task: task })
        .then((response) => {
          setFetchAllTodo(true);
          //   notification.open({
          //     message: <div style={{ color: "#fff8ea" }}>Task Added!</div>,
          //     description: "Yay, your task has been added!",
          //     className: "notification-design",
          //     style: {
          //       border: "2px solid #9E7676",
          //       backgroundColor: "#9E7676",
          //       color: "#fff8ea",
          //     },
          //     onClick: () => {
          //       console.log("New Task Added!");
          //     },
          //   });
          toast.success("New Task Added!", {
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
          toast.error("This didn't work.");
        });
    }
  };

  // to get the task which needs to be updated
  const editTask = (singleTaskObject: any, index: number) => {
    setTask(singleTaskObject.task);
    setItemIndex(index);
    setTaskObjectId(singleTaskObject._id);
    setIsupdate(true);
    // console.log("single task", singleTaskObject, singleTaskObject._id);
    // console.log("index", index);
    // console.log(singleTaskObject.task, "singleTaskObject.task");
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div>
          <Toaster />
        </div>
        <Row>
          <Col
            span={4}
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            {" "}
            <ImportTodo setFetchAllTodo={setFetchAllTodo} />
          </Col>
          <Col span={16}>
            {" "}
            <Form onSubmitCapture={handleSubmit}>
              <Input.Group compact>
                <Input
                  style={{ width: "calc(100% - 400px)", borderRadius: "5px" }}
                  value={task}
                  placeholder="Enter task"
                  onChange={handleChange}
                />
                <Button className="btn-design" onClick={handleSubmit}>
                  Create
                </Button>
              </Input.Group>
            </Form>
          </Col>
          <Col span={4} style={{ display: "flex" }}>
            <ExportTodo taskArray={taskArray} />
          </Col>
        </Row>
      </div>

      <ReadTodo
        taskArray={taskArray}
        setTaskArray={setTaskArray}
        editTask={editTask}
      />
    </>
  );
};

export default CreateTodo;

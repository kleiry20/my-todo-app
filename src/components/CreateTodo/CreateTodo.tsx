import React, { useState, useEffect } from "react";
import { Input, Button, Form, Row, Col, Alert } from "antd";
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
  const [fetchAllTodo, setFetchAllTodo] = useState(false); //

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
          alert("Task Updated!");
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    // isupdate is false --> new task creation
    else {
      const response = axios.post("http://localhost:5000/todo", { task: task });
      let tasks: JSON[] = taskArray;
      let temp_task: any = {
        task: task,
      };
      tasks.push(temp_task);
      setTaskArray(tasks);
      setTask("");
      alert("New Task Created!");
    }
  };

  // to get the task which needs to be updated
  const editTask = (singleTaskObject: any, index: number) => {
    setTask(singleTaskObject.task);
    setItemIndex(index);
    setTaskObjectId(singleTaskObject._id);
    setIsupdate(true);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Row>
          <Col span={4}>
            {" "}
            <ImportTodo setFetchAllTodo={setFetchAllTodo} />
          </Col>
          <Col span={16}>
            {" "}
            <Form onSubmitCapture={handleSubmit}>
              <Input.Group compact>
                <div>
                  {/* <p style={{ margin: "0px", textAlign: "center" }}>
                    I have to:{" "}
                  </p>{" "} */}
                </div>
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

      {/* <div className="new-flex-row-container">
        <div className="new-flex-row-item">
          <Form onSubmitCapture={handleSubmit}>
            <Input.Group compact>
              <div>
                <p style={{ margin: "0px", textAlign: "center" }}>
                  I have to:{" "}
                </p>{" "}
              </div>
              <Input
                style={{ width: "calc(100% - 400px)" }}
                value={task}
                placeholder="Enter task"
                onChange={handleChange}
              />
              <Button className="btn-design" onClick={handleSubmit}>
                Create
              </Button>
            </Input.Group>
          </Form>
        </div>
        <div className="new-flex-row-item">
          <ExportTodo taskArray={taskArray} />
        </div>
        <div className="new-flex-row-item">
          <ImportTodo setFetchAllTodo={setFetchAllTodo} />
        </div>
      </div> */}

      <ReadTodo
        taskArray={taskArray}
        setTaskArray={setTaskArray}
        editTask={editTask}
      />
    </>
  );
};

export default CreateTodo;

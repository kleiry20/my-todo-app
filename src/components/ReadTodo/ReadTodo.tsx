import React from "react";
import { Row, Col } from "antd";

import DeleteTodo from "../DeleteTodo/DeleteTodo";
import UpdateTodo from "../UpdateTodo/UpdateTodo";
import "./ReadTodo.less";
import ExportTodo from "../ExportTodo/ExportTodo";

function ReadTodo(props: any): JSX.Element {
  return (
    <>
      <div className="outer-div">
        <div id="sample">
          {props.taskArray.map((singleTaskObject: any, index: BigInt) => (
            <Row key={singleTaskObject} style={{ marginTop: "20px" }}>
              <Col
                span={8}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "20px",
                  // marginLeft: "34px",
                }}
              >
                {singleTaskObject.task}
              </Col>
              <Col span={4}></Col>
              <Col span={12}>
                <DeleteTodo
                  taskArray={props.taskArray}
                  index={index}
                  setTaskArray={props.setTaskArray}
                  singleTaskObjectId={singleTaskObject._id}
                />
                <UpdateTodo
                  index={index}
                  editTask={props.editTask}
                  singleTaskObject={singleTaskObject}
                />
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReadTodo;

{
  /* <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "34px",
                }}
              >
                {todo.username}
                <DeleteTodo
                  taskArray={props.taskArray}
                  index={index}
                  setTaskArray={props.setTaskArray}
                />
                <UpdateTodo
                  index={index}
                  editTask={props.editTask}
                  task={todo}
                />
              </p> */
}

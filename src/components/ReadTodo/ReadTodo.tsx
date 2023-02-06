import { Row, Col, Card, Divider } from "antd";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import UpdateTodo from "../UpdateTodo/UpdateTodo";
import "./ReadTodo.less";
import "../neumorphic.less";

function ReadTodo(props: any): JSX.Element {
  return (
    <>
      <div className="outer-div">
        <div id="sample" className="flex-row-container">
          {props.taskArray.map((singleTaskObject: any, index: BigInt) => (
            <>
              {" "}
              {/* using flex */}
              <div className="flex-row-container">
                <div className="flex-row-item">
                  <Card size="small" className="card-bg element flat">
                    <div>
                      <ul>
                        <li style={{ color: "#594545" }}>
                          {singleTaskObject.task}
                        </li>
                      </ul>
                    </div>
                    <Divider />
                    <Row style={{ marginBottom: "8px" }}>
                      <Col span={12} style={{ textAlign: "center" }}>
                        <DeleteTodo
                          taskArray={props.taskArray}
                          index={index}
                          setTaskArray={props.setTaskArray}
                          singleTaskObjectId={singleTaskObject._id}
                        />
                      </Col>
                      <Col span={12} style={{ textAlign: "center" }}>
                        <UpdateTodo
                          index={index}
                          editTask={props.editTask}
                          singleTaskObject={singleTaskObject}
                        />
                      </Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReadTodo;

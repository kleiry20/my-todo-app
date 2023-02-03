import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { Input } from "antd";
import "../../App.less";

const ImportTodo = (props: any) => {
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: any) => {
    setIsModalOpen(true);
  };

  const handleOnSubmit1 = (e: any) => {
    e.preventDefault();
    console.log("through modal");

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
    console.log("exit modal");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // file upload part
  const [file, setFile] = useState();
  const [array, setArray] = useState<any[]>([]);

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string: string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array: any[] = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object: any, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    array.map((item: any) => {
      if (item.task != undefined && item.task != null) {
        const response = axios
          .post("http://localhost:5000/todo", {
            task: item.task,
          })
          .then((response) => {
            props.setFetchAllTodo(true);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log("through choose file");

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  // const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <form>
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          />

          <Button
            className="btn-design"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Import a Todo
          </Button>
        </form>
        <br />
      </div>

      {/* <>
        <Button type="primary" onClick={showModal} className="btn-design">
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={(e) => {
            handleOnSubmit1(e);
          }}
          onCancel={handleCancel}
        >
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />
          </form>
        </Modal>
      </> */}
    </>
  );
};

export default ImportTodo;

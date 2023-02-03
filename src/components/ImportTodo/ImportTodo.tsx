import React, { useState } from "react";
import axios from "axios";

const ImportTodo = (props: any) => {
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

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />
    </div>
  );
};

export default ImportTodo;

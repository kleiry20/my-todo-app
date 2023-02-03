import React, { useState, useEffect } from "react";
import axios from "axios";
import Child from "./Child";

const Parent = () => {
  const [apple, setApple] = useState("");
  const url = "http://localhost:5000/";

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = () => {
    axios
      .get(`${url}todo`)
      .then((response) => {
        const allTodos = response.data;
        setApple(allTodos);
        console.log("allTodos in apple", allTodos);
        console.log("apple", apple);
      })
      .catch((error) => {
        console.log(`error in parent: ${error}`);
      });
  };

  return (
    <div>
      <Child apple={apple} />
    </div>
  );
};

export default Parent;

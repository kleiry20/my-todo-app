import React from "react";
import { Divider } from "antd";

const Child = (props: any) => {
  console.log("Props in child", props);

  const displayApples = (props: any) => {
    const { name, apple } = props;

    if (apple.length > 0) {
      return apple.map((singleApple: any, index: number) => {
        console.log(singleApple);
        return (
          <div key={singleApple.id}>
            <h3>{singleApple.name}</h3>
            <p>{singleApple.task}</p>
            <Divider />
          </div>
        );
      });
    } else {
      return <h3>Nothing</h3>;
    }
  };

  return <div>{displayApples(props)}</div>;
};

export default Child;

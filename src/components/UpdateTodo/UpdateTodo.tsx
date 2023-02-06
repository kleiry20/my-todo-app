import { Button } from "antd";

function UpdateTodo(props: any): JSX.Element {
  const editTodo = (singleTaskObject: any, index: number) => {
    console.log(props, "props onclick");
    props.editTask(singleTaskObject, index);
  };

  return (
    <Button
      className="btn-group btn-design"
      onClick={() => {
        editTodo(props.singleTaskObject, props.index);
      }}
    >
      Update
    </Button>
  );
}

export default UpdateTodo;

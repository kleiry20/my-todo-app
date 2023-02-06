import axios from "axios";
import Papa from "papaparse";
import "../../App.less";

const ImportTodo = (props: any) => {
  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    // Passing file data (e.target.files[0]) to parse using Papa.parse
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        // passing resultant data to api
        results.data.map((item: any) => {
          console.log(item, item["task"], item._id);
          if (item.task != undefined && item.task != null) {
            const response = axios
              .post("http://localhost:5000/todo", {
                task: item.task,
              })
              .then((response) => {
                props.setFetchAllTodo(true);
                // notification.open({
                //   message: <div style={{ color: "#fff8ea" }}>Task Imported!</div>,
                //   description: "Your todo list has been imported!",
                //   style: {
                //     border: "2px solid #9E7676",
                //     backgroundColor: "#9E7676",
                //     color: "#fff8ea",
                //   },
                //   onClick: () => {
                //     console.log("Task Imported!");
                //   },
                // });
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          }
        });
      },
    });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* File Uploader */}
        <input
          style={{ display: "none" }}
          className="btn-design"
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        <label
          htmlFor={"csvFileInput"}
          style={{
            borderRadius: "5px",
            height: "20px",
            display: "flex",
            backgroundColor: "#815b5b",
            color: "#fff8ea",
            textAlign: "center",
            boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",

            padding: "6px 15px",
            cursor: "pointer",
          }}
        >
          Import A Todo
        </label>
        <br />
      </div>
    </>
  );
};
export default ImportTodo;

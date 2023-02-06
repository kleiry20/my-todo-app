import axios from "axios";
import Papa from "papaparse";
import toast, { Toaster } from "react-hot-toast";
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
                // toast.success("Task List Imported!", {
                //   style: {
                //     border: "1px solid #713200",
                //     padding: "16px",
                //     color: "#713200",
                //   },
                //   iconTheme: {
                //     primary: "#713200",
                //     secondary: "#FFFAEE",
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

import CreateTodo from "./components/CreateTodo/CreateTodo";
import "./App.css";
import Parent from "./components/Parent";
// import "/themes.less";

function App() {
  return (
    <div>
      <div
        className="app-title"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        TODO APP
      </div>
      <CreateTodo />
      {/* <Parent /> */}
    </div>
  );
}

export default App;

import CreateTodo from "./components/CreateTodo/CreateTodo";
import "./App.less";

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
    </div>
  );
}

export default App;

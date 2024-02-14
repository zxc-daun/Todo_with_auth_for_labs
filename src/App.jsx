import "./index.css";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/task" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

export default App;

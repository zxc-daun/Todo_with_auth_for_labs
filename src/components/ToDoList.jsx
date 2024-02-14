import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import TaskCard from "./TaskCard";
import ShortUniqueId from "short-unique-id";
import { Navigate } from "react-router-dom";

const uid = new ShortUniqueId({ length: 10 });

const ToDoList = () => {
  const { user, handleLogout, isUserValid } = useContext(UserContext);
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [doneTask, setDoneTask] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tododonetask"));
    if (data !== null) {
      setDoneTask(data);
    }
  }, [tasks]);

  function handleAdd() {
    if (inputTask === "") {
      alert("Please Enter Task");
      return;
    }
    let oldTask = JSON.parse(localStorage.getItem("todotask"));

    if (oldTask === null) {
      const data = { isDone: false, task: inputTask, id: uid.rnd() };
      const newTask = [data];
      localStorage.setItem("todotask", JSON.stringify(newTask));
    } else {
      const newTask = [
        { isDone: false, task: inputTask, id: uid.rnd() },
        ...oldTask,
      ];
      localStorage.setItem("todotask", JSON.stringify(newTask));
    }

    setInputTask("");
  }
  let oldTask = [];

  function handleEdit(e) {
    console.log(e.target.dataset.id);
  }

  function handleDone(e) {
    const id = e.target.dataset.id;
    oldTask = JSON.parse(localStorage.getItem("todotask"));

    oldTask.forEach((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }

      if (task.isDone) {
        let doneTask = JSON.parse(localStorage.getItem("tododonetask"));
        if (doneTask === null) {
          let newDoneTask = [];
          newDoneTask.push(task);
          localStorage.setItem("tododonetask", JSON.stringify(newDoneTask));
        } else {
          let newDoneTask = [task, ...doneTask];
          localStorage.setItem("tododonetask", JSON.stringify(newDoneTask));
        }
      }
    });

    oldTask = oldTask.filter((task) => task.isDone === false);
    localStorage.setItem("todotask", JSON.stringify(oldTask));
    setTasks(oldTask);
  }

  function handleDelete(e) {
    const id = e.target.dataset.id;
    if (id !== null || id !== undefined) {
      oldTask = JSON.parse(localStorage.getItem("todotask"));
      let oldDoneTask = JSON.parse(localStorage.getItem("tododonetask"));

      oldDoneTask = oldDoneTask.filter((task) => task.id !== id);
      localStorage.setItem("tododonetask", JSON.stringify(oldDoneTask));

      const newTask = oldTask.filter((task) => task?.id !== id);

      localStorage.setItem("todotask", JSON.stringify(newTask));
      setTasks(newTask);
    }
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todotask"));
    setTasks(data);
  }, [inputTask]);

  if (!isUserValid) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="flex justify-end gap-4 p-4 items-center">
        {user !== null && (
          <>
            <div>Welcome Back {user.name}</div>
            <div
              className="p-1 bg-gray-500 rounded-sm cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </>
        )}
      </div>
      <div className="w-full flex m-auto gap-5 justify-center items-center sm:flex-row md:flex-row flex-col">
        <div className="w-[80%]">
          <input
            type="text"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Enter Task Here..."
            className="focus:outline-none p-2 w-full"
          />
        </div>
        <button className=" bg-blue-400 p-2 rounded-sm" onClick={handleAdd}>
          Add Task
        </button>
      </div>

      <div className="max-w-[90%] mt-5 m-auto">
        <h1 className="text-center text-2xl font-bold">Task Here</h1>
        <div className="m-auto lg:w-[60%] ">
          {tasks?.length > 0 &&
            tasks.map((task, index) => (
              <TaskCard
                key={index}
                data={{
                  task,
                  handleDone,
                  handleDelete,
                  isDoneTask: false,
                  handleEdit,
                }}
              />
            ))}

          {doneTask?.length > 0 &&
            doneTask.map((task, index) => (
              <TaskCard
                key={index}
                data={{ task, handleDone, handleDelete, isDoneTask: true }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;

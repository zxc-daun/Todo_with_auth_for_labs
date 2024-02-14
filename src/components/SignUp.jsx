import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, isUserValid } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  function handleLoginForm() {
    // setEmail("");
    // setPassword("");
    if (email === "" || password === "" || name === "") {
      alert("Please Insert All Input Properly");
      return;
    }

    const isUserPresent = localStorage.getItem("todouser");

    if (isUserPresent === null) {
      localStorage.setItem(
        "todouser",
        JSON.stringify({ name, email, password })
      );
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  console.log(isUserValid);
  if (isUserValid === true) {
    return <Navigate to={"/task"} />;
  }

  return (
    <div className="flex flex-col gap-5 m-auto h-[100vh] lg:max-w-[30%] max-w-[80%] justify-center ">
      <h1 className="text-2xl font-bold md:text-4xl">
        Welcome To List Checker
      </h1>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name Here...."
          className="w-full p-2"
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Name Here...."
          className="w-full p-2"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Name Here...."
          className="w-full p-2"
        />
      </label>

      <button
        className="border p-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
        onClick={handleLoginForm}
      >
        Sign Up
      </button>

      <p className="text-center">
        Already Have An Account?{" "}
        <Link to={"/login"} className="cursor-pointer underline">
          <br className="" />
          Login Now
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

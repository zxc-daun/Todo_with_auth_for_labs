import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isUserValid, setIsUserValid } = useContext(UserContext);

  function handleLoginForm() {
    if (email === "" || password === "") {
      alert("Please Insert All Input Properly");
      return;
    }
    const data = JSON.parse(localStorage.getItem("todouser"));

    if (data === null) {
      alert("Sorry No User Present With This Data. Please Sign Up First");
    }

    if (data.email === email && data.password === password) {
      console.log(data.email);
      console.log(data.password);
      localStorage.setItem("todouservalid", true);
      setIsUserValid(true);
    }
  }

  if (isUserValid === true) {
    return <Navigate to={"/task"} />;
  }

  return (
    <div className="flex flex-col gap-5 h-[100vh] lg:max-w-[30%] m-auto  max-w-[80%] justify-center">
      <h1 className="text-2xl font-bold md:text-4xl">
        Welcome To List Checker
      </h1>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Name Here...."
          className="w-full p-2 focus:outline-none"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password Here...."
          className="w-full p-2 focus:outline-none"
        />
      </label>

      <button
        className="border p-2 rounded-md cursor-pointer hover:bg-white hover:text-black"
        onClick={handleLoginForm}
      >
        Login
      </button>
      <p className="text-center">
        Does Not Have An Account?{" "}
        <Link to={"/sign-up"} className="cursor-pointer underline">
          <br className="" />
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;

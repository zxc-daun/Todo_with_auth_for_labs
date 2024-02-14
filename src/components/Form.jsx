import { useContext, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Form = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const { user, isUserValid } = useContext(UserContext);

  console.log(user);
  return (
    <div className="flex justify-center items-center h-[100vh] w-full flex-col gap-[50px]">
      {isUserValid === true && <Navigate to={"/task"} />}
      <h1 className="text-2xl font-bold md:text-4xl">
        Welcome To List Checker
      </h1>

      {login === false && signUp === false && (
        <h1>Please Login Or Sign Up To See The Task</h1>
      )}

      {login === false && signUp === false && (
        <div className="flex gap-8">
          <Link to={"/login"} className="border p-2 rounded-md cursor-pointer">
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="border p-2 rounded-md cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Form;

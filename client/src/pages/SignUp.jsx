import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { errorData } from "../redux/user/userData";

const SignUp = () => {
  const [newUser, setNewUser] = useState(null);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.userData.error);

  const navigate = useNavigate()

  const inputHandler = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.success === false) {

        dispatch(errorData(data.message));
        return;
      }

      dispatch(errorData(null))

      navigate("/signin")

    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-semibold text-center uppercase">Sign Up</h1>
        <form
          onSubmit={submitHandler}
          className="my-12 mx-auto flex flex-col gap-4 md:w-[600px]"
        >
          <input
            id="username"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Username"
            onChange={inputHandler}
          />
          <input
            id="email"
            className="p-4 rounded-lg"
            type="email"
            placeholder="Email"
            onChange={inputHandler}
          />
          <input
            id="password"
            className="p-4 rounded-lg"
            type="password"
            placeholder="Password"
            onChange={inputHandler}
          />
          <button className="p-4 bg-orange-700 rounded-lg uppercase">Sign Up</button>
          <p className="flex gap-2">
            You Have Account ?
            <Link to="/signin">
              <span className="underline text-blue-800">SignIn</span>
            </Link>
          </p>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignUp;

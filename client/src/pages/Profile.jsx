import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { errorData, successData } from "../redux/user/userData";

const Profile = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.userData.error);
  const currentUser = useSelector((state) => state.userData.currentUser);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      if (!user) return

      const response = await fetch("/api/users/user/update/" + currentUser._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      console.log(data)

      if (data.success === false) {
        dispatch(errorData(data.message));
        return;
      }

      dispatch(successData(data));
      dispatch(errorData(null));

      navigate("/profile");
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  const signOutHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/users/user/signOut/" + currentUser._id, {
        method: "POST"
      });

      const data = await response.json();

      dispatch(successData(data));
      dispatch(errorData(null));

      navigate("/signin");
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  const deleteHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/users/user/delete/" + currentUser._id, {
        method: "DELETE"
      });

      const data = await response.json();

      dispatch(successData(data));
      dispatch(errorData(null));

      navigate("/signin");
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-semibold text-center uppercase">Profile</h1>
        <form
          onSubmit={submitHandler}
          className="my-12 mx-auto flex flex-col gap-4 md:w-[600px]"
        >

          <img className="h-36 w-36 rounded-full mx-auto object-cover" src={currentUser.avatar} alt="Profile" />
          <input
            id="avatar"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Avatar"
            onChange={inputHandler}
            defaultValue={currentUser.avatar}
          />
          <input
            id="username"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Username"
            onChange={inputHandler}
            defaultValue={currentUser.username}
          />
          <input
            id="email"
            className="p-4 rounded-lg"
            type="email"
            placeholder="Email"
            onChange={inputHandler}
            defaultValue={currentUser.email}
          />
          <input
            id="password"
            className="p-4 rounded-lg"
            type="password"
            placeholder="Password"
            onChange={inputHandler}
          />
          <button className="p-4 bg-orange-700 rounded-lg uppercase">Update</button>
          <p className="flex items-center justify-between">
            <span onClick={deleteHandler} className="text-red-800 uppercase cursor-pointer font-semibold">Delete</span>
            <span onClick={signOutHandler} className="text-red-800 uppercase cursor-pointer font-semibold">Sign Out</span>
          </p>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Profile;

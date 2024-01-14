import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignIn = () => {

  const [user, setUser] = useState(null);

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitHandler = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  
  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-semibold text-center">SignIn</h1>
        <form
          onSubmit={submitHandler}
          className="my-12 mx-auto flex flex-col gap-4 md:w-[600px]"
        >
          <input
            id="email"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Email"
            onChange={inputHandler}
          />
          <input
            id="password"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Password"
            onChange={inputHandler}
          />
          <button className="p-4 bg-orange-700 rounded-lg">SignIn</button>
          <p className="flex gap-2">
            You Have Account ?
            <Link to="/signup">
              <span className="underline text-blue-800">SignUp</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default SignIn
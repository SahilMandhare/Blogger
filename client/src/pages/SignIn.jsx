import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { errorData, successData } from '../redux/user/userData';

const SignIn = () => {

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.userData.error);
  const currentUser = useSelector((state) => state.userData.currentUser);

  const navigate = useNavigate()

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await response.json()

      if (data.success === false) {
        
        dispatch(errorData(data.message))
        return
      }

      dispatch(successData(data))
      dispatch(errorData(null))

      navigate("/profile")
    } catch (error) {
      dispatch(errorData(error.message))
    }
  };
  
  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-semibold text-center uppercase">Sign In</h1>
        <form
          onSubmit={submitHandler}
          className="my-12 mx-auto flex flex-col gap-4 md:w-[600px]"
        >
          <input
            id="email"
            className="p-4 rounded-lg"
            type="email"
            placeholder="Email"
            onChange={inputHandler}
            required
          />
          <input
            id="password"
            className="p-4 rounded-lg"
            type="password"
            placeholder="Password"
            onChange={inputHandler}
            required
          />
          <button className="p-4 bg-orange-700 rounded-lg uppercase">Sign In</button>
          <p className="flex gap-2">
            You Have Account ?
            <Link to="/signup">
              <span className="underline text-blue-800">SignUp</span>
            </Link>
          </p>
          {error && <p className='text-red-600'>{error}</p>}
        </form>
      </div>
    </>
  )
}

export default SignIn
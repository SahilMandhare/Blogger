import React from "react";
import { Link } from "react-router-dom";
import Broom from "../../public/Broom.png";
import Watch from "../../public/Watch.png";
import Drone from "../../public/Drone.png";
import FootBall from "../../public/FootBall.png";
import Phone from "../../public/Phone.png";
import Tea from "../../public/Tea.png";
import { useSelector } from "react-redux";

const Home = () => {

  const currentUser = useSelector(state => state.userData.currentUser)
  
  return (
    <>
      <div className="h-[623px] flex flex-col items-center justify-center relative gap-8 opacity-100">
        <h1 className="text-3xl font-semibold">
          Publish your passions, your way
        </h1>
        <span className="text-xl">
          Create a unique and beautiful blog easily.
        </span>
        <Link to={currentUser ? "/create-blog" : "/signin"}>
          <p className="p-4 bg-orange-600 rounded-lg">Create a Blog</p>
        </Link>
        <img
          className="absolute max-md:h-32 max-md:w-32 h-56 max-md:bottom-36 max-md:left-0 md:bottom-44 md:left-20 opacity-50 animate-bounce"
          src={Broom}
          alt=""
        />
        <img
          className="absolute max-md:h-32 max-md:w-32 h-56 max-md:bottom-4 max-md:left-20 md:bottom-4 md:left-80 opacity-50 animate-bounce"
          src={FootBall}
          alt=""
        />
        <img
          className="absolute max-md:h-32 max-md:w-32 h-56 max-md:bottom-4 max-md:right-20 md:bottom-4 md:right-80 opacity-50 animate-bounce"
          src={Watch}
          alt=""
        />
        <img
          className="absolute max-md:h-32 max-md:w-32 h-56 max-md:bottom-36 max-md:right-0 md:bottom-44 md:right-20 opacity-50 animate-bounce"
          src={Drone}
          alt=""
        />
        <img
          className="absolute max-md:h-32 max-md:w-32 h-48 max-md:bottom-36 max-md:right-0 md:bottom-4 md:right-[670px] opacity-10 rotate-12 animate-pulse max-md:hidden"
          src={Phone}
          alt=""
        />
        <img
          className="absolute max-md:h-44 max-md:w-44 h-56 max-md:top-28 max-md:right-40 md:top-16 md:right-[656px] opacity-50"
          src={Tea}
          alt=""
        />
      </div>
    </>
  );
};

export default Home;

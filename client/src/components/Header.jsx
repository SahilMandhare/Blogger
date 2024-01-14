import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

const Header = () => {
  return (
    <>
      <div className="py-4 px-8 flex items-center justify-between bg-orange-600 shadow-xl">
        <Link to="/">
          <h1 className="md:text-xl font-semibold">Blogger</h1>
        </Link>
        <div className="flex items-center justify-between gap-8">
          <Link to="/">
            <p className="max-md:hidden">Home</p>
          </Link>
          <Link to="/about">
            <p className="max-md:hidden">About</p>
          </Link>
          <Link to="/signin">
            <p>Sign In</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

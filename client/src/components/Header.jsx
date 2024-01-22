import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [search, setSearch] = useState("");

  const currentUser = useSelector((state) => state.userData.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search") || search);
  }, []);

  const inputHandler = (e) => {
    setSearch(e.target.value || "");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    navigate(`/search?search=${search}`);
  };

  return (
    <>
      <div className="py-4 px-8 flex items-center max-md:justify-between md:justify-around bg-orange-600 shadow-xl">
        <Link to="/">
          <h1 className="md:text-xl font-semibold">Blogger</h1>
        </Link>
        <form
          onSubmit={submitHandler}
          className="p-2 w-36 sm:w-64 flex items-center bg-[#292b2b] rounded-lg"
        >
          <input
            onChange={inputHandler}
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Seach..."
            value={search}
          />
          <button className="">🔍</button>
        </form>
        <div className="flex items-center justify-between md:gap-8">
          <Link to="/">
            <p className="max-md:hidden">Home</p>
          </Link>
          <Link to="/about">
            <p className="max-md:hidden">About</p>
          </Link>
          {!currentUser ? (
            <Link to="/signin">
              <p>Sign In</p>
            </Link>
          ) : (
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

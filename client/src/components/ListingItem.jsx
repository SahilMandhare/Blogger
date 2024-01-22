import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListingItem = ({ blog, user, deleteHandler }) => {
  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <Link to={"/blog/" + blog._id}>
        <div className="max-md:w-auto md:w-[300px] h-[470px] rounded-lg shadow-xl">
          <img
            className="flex items-center justify-center rounded-lg"
            src={blog.image}
            alt="Profile"
          />
          <div className="m-4 flex items-center gap-2">
            <img
              className="h-8 w-8 rounded-full object-cover brightness-75"
              src={user.avatar}
              alt=""
            />
            <span className="brightness-75 italic text-sm">
              {user.username}
            </span>
            <p className="brightness-75 italic text-sm">
              {blog.createdAt.slice(0, 10)}
            </p>
          </div>
          <div className="m-4 flex flex-col gap-4">
            <h1 className="text-3xl">{blog.title}</h1>
            <span className="p-1 bg-purple-800 rounded-lg w-fit">
              {blog.type}
            </span>
            <p className="flex flex-wrap">
              {blog.description.slice(0, 100)}
              {blog.description.length > 100 ? "..." : ""}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex w-full">
        <div
          onClick={(e) => deleteHandler(e, blog._id)}
          className="p-4 border-2 border-red-800 w-3/6 text-center rounded-lg hover:bg-red-800 cursor-pointer"
        >
          Delete
        </div>
        <div className="p-4 border-2 border-green-800 w-3/6 text-center rounded-lg hover:bg-green-800">
          <Link to={"/update-blog/" + blog._id}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;

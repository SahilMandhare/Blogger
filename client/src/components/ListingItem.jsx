import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListingItem = ({ blog, setRefresh }) => {
  const currentUser = useSelector((state) => state.userData.currentUser);

  const [user, setUser] = useState({
    username: "Not Found",
    avatar: "No image",
  });

  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/users/user/" + blog.userRef);
        const data = await response.json();

        console.log(data);

        if (data.success === false) {
          return;
        }
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    blog.userRef !== currentUser._id && userData();
  }, [location.search]);

  const deleteHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/blogs/blog/delete/" + blog._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center relative">
      <Link to={"/blog/" + blog._id}>
        <div className="max-md:w-[18rem] md:w-[300px] h-[470px] rounded-lg shadow-xl">
          <img
            className="flex items-center justify-center rounded-lg h-48 w-full object-cover"
            src={blog.image}
            alt="Profile"
          />
          <div className="m-4 flex items-center gap-2">
            <img
              className="h-8 w-8 rounded-full object-cover brightness-75"
              src={
                blog.userRef === currentUser._id
                  ? currentUser.avatar
                  : user.avatar
              }
              alt=""
            />
            <span className="brightness-75 italic text-sm">
              {blog.userRef === currentUser._id
                ? currentUser.username
                : user.username}
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
      {blog.userRef === currentUser._id && (
        // <div className="flex w-full">
        //   <div
        //     onClick={(e) => deleteHandler(e, blog._id)}
        //     className="p-4 border-2 border-red-800 w-3/6 text-center rounded-lg hover:bg-red-800 cursor-pointer"
        //   >
        //     Delete
        //   </div>
        //   <div className="p-4 border-2 border-green-800 w-3/6 text-center rounded-lg hover:bg-green-800">
        //     <Link to={"/update-blog/" + blog._id}>Update</Link>
        //   </div>
        // </div>
        <>
          <div
            onClick={() => setEnable(!enable)}
            className="absolute h-4 w-4 top-1 right-0 rounded-full flex flex-col items-center justify-center gap-[2px] cursor-pointer"
          >
            <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
            <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
            <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
            <div
              className={`${
                enable ? "visible" : "hidden"
              } p-2 absolute top-6 right-1 bg-gray-500 rounded-lg`}
            >
              <div className="text-red-800 font-semibold" onClick={deleteHandler}>
                Delete
              </div>
              <hr />
              <div className="text-green-800 font-semibold">
                <Link to={"/update-blog/" + blog._id}>Update</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListingItem;
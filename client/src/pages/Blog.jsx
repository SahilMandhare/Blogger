import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);

  const currentUser = useSelector((state) => state.userData.currentUser);

  const params = useParams();

  const userData = async (id) => {
    try {
      const response = await fetch("/api/users/user/" + id);
      const data = await response.json();

      console.log(data);

      if (data.success === false) {
        setUser({
          username: "Not Found",
          avatar: "No image",
        });
        return;
      }
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const blogData = async () => {
      try {
        const response = await fetch("/api/blogs/blog/" + params.id);
        const data = await response.json();

        setBlog(data);
        userData(data.userRef)
      } catch (error) {
        console.log(error);
      }
    };

    blogData();
  }, []);
  
  return (
    blog &&
    user && (
      <>
        <div className="m-8 flex flex-col items-center justify-center">
          <div className="max-md:w-96 md:w-8/12 rounded-lg shadow-xl">
            <img
              className="flex items-center justify-center rounded-lg sm:h-[34rem] h-[14rem] w-full object-cover"
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
              <p className="flex flex-wrap">{blog.description}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Blog;

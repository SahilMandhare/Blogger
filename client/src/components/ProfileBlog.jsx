import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileBlog = () => {
  const [blogs, setBlogs] = useState(null);

  const currentUser = useSelector((state) => state.userData.currentUser);

  useEffect(() => {
    const blogData = async () => {
      try {
        const response = await fetch("/api/blogs/blog/user/" + currentUser._id);
        const data = await response.json();

        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    blogData();
  }, []);

  return (
    blogs && (
      <>
        <div className="max-md:px-6 md:px-[213px] w-full flex max-md:flex-col flex-wrap">
          {blogs.map((blog) => {
            return (
              <div className="m-8 flex flex-col items-center justify-center">
                <div className="max-md:w-auto md:w-[300px] h-[470px] rounded-lg shadow-xl">
                  <img
                    className="flex items-center justify-center rounded-lg"
                    src={blog.image}
                    alt="Profile"
                  />
                  <div className="m-4 flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover brightness-75"
                      src={currentUser.avatar}
                      alt=""
                    />
                    <span className="brightness-75 italic text-sm">
                      {currentUser.username}
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
              </div>
            );
          })}
        </div>
      </>
    )
  );
};

export default ProfileBlog;

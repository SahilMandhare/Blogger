import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);

  const params = useParams();

  useEffect(() => {
    const blogData = async () => {
      try {
        const response = await fetch("/api/blogs/blog/" + params.id);
        const data = await response.json();

        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };

    blogData();
  }, []);

  useEffect(() => {

    const userData = async () => {
        try {
          const response = await fetch("/api/users/user/" + blog.userRef);
          const data = await response.json();
  
          setUser(data);
        } catch (error) {
          console.log(error);
        }
      };

    userData()
  }, [blog]);

  return (
    blog && user && (
      <>
        <div className="m-8 flex flex-col items-center justify-center">
          <div className="max-md:w-auto md:w-8/12 rounded-lg shadow-xl">
            <img
              className="flex items-center justify-center rounded-lg"
              src={blog.image}
              alt="Profile"
            />
            <div className="m-4 flex items-center gap-2">
                <img className="h-8 w-8 rounded-full object-cover brightness-75" src={user.avatar} alt="" />
                <span className="brightness-75 italic text-sm">{user.username}</span>
                <p className="brightness-75 italic text-sm">{user.createdAt.slice(0, 10)}</p>
            </div>
            <div className="m-4 flex flex-col gap-4">
              <h1 className="text-3xl">{blog.title}</h1>
              <span className="p-1 bg-purple-800 rounded-lg w-fit">{blog.type}</span>
              <p className="flex flex-wrap">{blog.description}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Blog;
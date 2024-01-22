import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

const ProfileBlog = () => {
  const [blogs, setBlogs] = useState(null);

  const currentUser = useSelector((state) => state.userData.currentUser);

  const blogData = async () => {
    try {
      const response = await fetch("/api/blogs/blog/user/" + currentUser._id);
      const data = await response.json();

      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {

    blogData();
  }, []);

  const deleteHandler = async (e, blog) => {
    try {
      e.preventDefault()
      const response = await fetch("/api/blogs/blog/delete/" + blog, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      blogData()
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blogs)

  return (
    blogs && (
      <>
        <div className="max-md:px-6 md:px-[213px] w-full flex max-md:flex-col flex-wrap">
          {blogs.map((blog) => {
            return <ListingItem blog={blog} user={currentUser} deleteHandler={deleteHandler}/>
          })}
        </div>
      </>
    )
  );
};

export default ProfileBlog;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

const ProfileBlog = () => {
  const [blogs, setBlogs] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const currentUser = useSelector((state) => state.userData.currentUser);

  const blogData = async () => {
    try {
      const response = await fetch("/api/blogs/blog/user/" + currentUser._id);
      const data = await response.json();

      setBlogs(data);
      setRefresh(false)
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {

    blogData();
  }, [refresh]);

  console.log(blogs)

  return (
    blogs && (
      <>
        <div className="max-md:px-6 md:px-[213px] w-full flex max-md:flex-col flex-wrap items-center justify-center">
          {blogs.map((blog) => {
            return <ListingItem blog={blog} setRefresh={setRefresh}/>
          })}
        </div>
      </>
    )
  );
};

export default ProfileBlog;
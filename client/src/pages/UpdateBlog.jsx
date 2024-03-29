import React, { useEffect, useState } from "react";
import { errorData } from "../redux/user/userData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const [blog, setBlog] = useState(null);

  const error = useSelector((state) => state.userData.error);
  const currentUser = useSelector((state) => state.userData.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const params = useParams()

  const inputHandler = (e) => {
    setBlog({ ...blog, [e.target.id]: e.target.value });
  };

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

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      if (!blog) return;

      const response = await fetch("/api/blogs/blog/update/" + params.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(errorData(data.message));
        return;
      }
      dispatch(errorData(null));

      navigate("/profile");
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  return blog && (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-semibold text-center uppercase">
          Update a Blog
        </h1>
        <form
          onSubmit={submitHandler}
          className="my-12 mx-auto flex flex-col gap-4 md:w-[600px]"
        >
          <input
            id="image"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Image"
            onChange={inputHandler}
            defaultValue={blog.image}
            required
          />
          <input
            id="title"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Title"
            onChange={inputHandler}
            defaultValue={blog.title}
            required
          />
          <select
            id="type"
            className="p-4 rounded-lg"
            type="text"
            placeholder="Type"
            onChange={inputHandler}
            defaultValue={blog.type}
            required
          >
            <option value="">Select an Option</option>
            <option value="travel">Travel</option>
            <option value="business">Business</option>
            <option value="lifestyle">LifeStyle</option>
            <option value="food">Food</option>
            <option value="adventure">Adventure</option>
          </select>
          <textarea
            id="description"
            className="p-4 rounded-lg h-48"
            placeholder="Description"
            onChange={inputHandler}
            defaultValue={blog.description}
            required
          />
          <button className="p-4 bg-orange-700 rounded-lg uppercase">
            Update Blog
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
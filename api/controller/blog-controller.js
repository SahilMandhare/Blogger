import Blog from "../model/blog.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createBlog = async (req, res, next) => {
  const newBlog = new Blog({
    title: req.body.title,
    type: req.body.type,
    image: req.body.image,
    description: req.body.description,
    userRef: req.params.id,
  });

  await newBlog
    .save()
    .then(() => res.json({ message: "Blog Created" }))
    .catch((error) => next(errorHandler(401, error.message)));
};

export const blog = async (req, res, next) => {
  const _id = req.params.id;

  const blogData = await Blog.findById({ _id });

  if (!blogData) {
    next(errorHandler(401, "Blog Not Found"));
    return;
  }

  res.status(200).json(blogData);
};

export const userBlog = async (req, res, next) => {
  const userRef = req.params.id;

  const blogData = await Blog.find({ userRef });

  if (!blogData) {
    next(errorHandler(401, "Blog Not Found"));
    return;
  }

  res.status(200).json(blogData);
};

export const updateBlog = async (req, res, next) => {
  const _id = req.params.id;

  const newBlog = await Blog.findByIdAndUpdate(
    { _id },
    {
      title: req.body.title,
      type: req.body.type,
      image: req.body.image,
      description: req.body.description,
    },
    { new: true }
  );

  res.status(200).json(newBlog)
};

export const deleteBlog = async (req, res, next) => {
  const _id = req.params.id;

  const newBlog = await Blog.findByIdAndDelete({ _id });

  res.status(200).json(newBlog)
};
import express from "express";
import { blog, createBlog, deleteBlog, filterBlog, updateBlog, userBlog } from "../controller/blog-controller.js";

const route = express.Router()

route.post("/blog/create/:id", createBlog)
route.post("/blog/update/:id", updateBlog)
route.get("/filter?", filterBlog)
route.get("/blog/user/:id", userBlog)
route.delete("/blog/delete/:id", deleteBlog)
route.get("/blog/:id", blog)

export default route
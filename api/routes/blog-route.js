import express from "express";
import { blog, createBlog, updateBlog, userBlog } from "../controller/blog-controller.js";

const route = express.Router()

route.post("/blog/create/:id", createBlog)
route.post("/blog/update/:id", updateBlog)
route.get("/blog/user/:id", userBlog)
route.get("/blog/:id", blog)

export default route
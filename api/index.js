import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-route.js";
import userRouter from "./routes/user-route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB Connect"))
  .catch((error) => console.log(error));

const app = express();

app.use(cookieParser())

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(4000, () => {
  console.log("Successfully Port");
});

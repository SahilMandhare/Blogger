import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token)

  if (!token) {
    next(errorHandler(401, "UnAuthorized"));
    return;
  }

  jwt.verify(token, process.env.Private_Key, (err, user) => {
    if (err) {
      next(errorHandler(403, "Forbidden"));
      return;
    }
    console.log(user)

    req.user = user;

    next();
  });
};

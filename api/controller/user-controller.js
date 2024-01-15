import User from "../model/user.js";
import { errorHandler } from "../utils/errorHandler.js";

export const user = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });

  await newUser
    .save()
    .then(() => res.json({ message: "User Created" }))
    .catch((error) => next(errorHandler(401, error.message)));
};

export const signin = () => {};

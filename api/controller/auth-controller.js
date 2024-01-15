import User from "../model/user.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });

  await newUser
    .save()
    .then(() => res.json({ message: "User Created" }))
    .catch((error) => next(errorHandler(401, error.message)));
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });

  if (!validUser) {
    next(errorHandler(401, "No User Found"));
    return;
  }

  if (validUser.password !== password) {
    next(errorHandler(401, "Wrong Credintional"));
    return;
  }

  const { password: pass, ...remain } = validUser._doc

  res.status(200).json(remain);
};

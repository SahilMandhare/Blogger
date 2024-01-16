import User from "../model/user.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 12)

  const newUser = new User({ username, email, password: hashPassword });

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

  const passwordCompare = bcryptjs.compareSync(password, validUser.password)

  if (!passwordCompare) {
    next(errorHandler(401, "Wrong Credintional"));
    return;
  }

  const token = jwt.sign({id: validUser._id}, process.env.Private_Key)

  const cookieConfig = {
    httpOnly: true,
    path: "/"
  }

  const { password: pass, ...remain } = validUser._doc

  res.cookie("token", token, cookieConfig).status(200).json(remain);
};

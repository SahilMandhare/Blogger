import User from "../model/user.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

export const userUpdate = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    next(errorHandler(401, "UnAuthorized"));
    return;
  }

  const _id = req.params.id;

  const newHashPassword = bcryptjs.hashSync(req.body.password, 12);

  const updateUser = await User.findByIdAndUpdate(
    { _id },
    {
      username: req.body.username,
      email: req.body.email,
      password: newHashPassword,
      avatar: req.body.avatar,
    },
    { new: true }
  );

  res.status(200).json(updateUser);
};

export const userSignOut = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    next(errorHandler(401, "UnAuthorized"));
    return;
  }

  res.clearCookie("token").status(200).json(null);
};

export const userDelete = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    next(errorHandler(401, "UnAuthorized"));
    return;
  }

  const _id = req.params.id;

  const deleteUser = await User.findByIdAndDelete({ _id });

  res.clearCookie("token").status(200).json(null);
};
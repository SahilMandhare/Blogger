import User from "../model/user.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

export const userUpdate = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    next(errorHandler(401, "UnAuthorized"));
    return;
  }

  const _id = req.params.id;

  let newHashPassword = undefined;

  if (req.body.password) {
    newHashPassword = bcryptjs.hashSync(req.body.password, 12);
  }

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

  const { password: pass, ...remain } = updateUser._doc;

  res.status(200).json(remain);
};

export const user = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    next(errorHandler(401, "UnAuthorized"));
    return;
  }

  const _id = req.params.id;

  const userData = await User.findById({_id});

  const { password: pass, ...remain } = userData._doc;

  res.status(200).json(remain);
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

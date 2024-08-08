import { asyncHandler } from "../error/errorHandler.js";
import { appError } from "../error/classError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../DB/models/user.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await userModel.findOne({ email: email.toLowerCase() });
  if(userExist) next(new appError("user already exist", 409));
  const hash = bcrypt.hashSync(password, 10);
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });
  res.status(200).json({ msg: "done", user });
});

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const compare = bcrypt.compareSync(password, user.password);
  if (!user || !compare)
    return next(new appError("email or password is wrong", 400));
  const token = jwt.sign({ email }, process.env.signatureKeySignIn);
  res.status(200).json({ msg: "done", user, token });
});

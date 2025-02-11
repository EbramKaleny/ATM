import userModel from "../DB/models/user.js";
import jwt from "jsonwebtoken";
import { appError } from "../error/classError.js";
import { asyncHandler } from "../error/errorHandler.js";

export const auth = () => {
  return asyncHandler(async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
          next(new appError("invalid token", 400));
        }
        if (!token.startsWith(process.env.bearerKey)) {
          next(new appError("invalid token",400));
        }
        const newToken = token.split(process.env.bearerKey)[1]
        if(!newToken){
            next(new appError("invalid token", 400))
        }
        const decoded = jwt.verify(newToken, process.env.signatureKeySignIn);
        if(!decoded?.email){
            next(new appError("invalid token", 400))
        }
        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
          next(new appError("user not found", 404));
        }
        req.user = user;
        next();
    } catch (error) {
        next(new appError("catched error in auth", 400))
    }
  });
};

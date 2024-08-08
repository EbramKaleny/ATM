import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: 3,
    maxLength: 15,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
  },
  accountID: {
    type: Types.ObjectId,
    ref:"account"
  }
});

const userModel = mongoose.model("user",userSchema)
export default userModel
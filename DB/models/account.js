import mongoose, { Types } from "mongoose";

const accountSchema = new mongoose.Schema({
  money:{
    type: Number,
    default: 0
  },
  userID: {
    type: Types.ObjectId,
    ref:"user"
  }
});

const accountModel = mongoose.model("account",accountSchema)
export default accountModel
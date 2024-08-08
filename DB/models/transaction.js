import mongoose, { Types } from "mongoose";

const transactionSchema = new mongoose.Schema({
  accountID: {
    type: Types.ObjectId,
    ref:"account"
  },
  transactionType: {
    type: String,
    enum: ["deposite", "withdraw"],
    required: [true, "type of transaction is required"]
  },
  amount:{
    type: Number,
    required: [true, "amount of transaction is required"]
  }
},{
  timestamps: true
});

const transactionModel = mongoose.model("transaction",transactionSchema)
export default transactionModel
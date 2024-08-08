import { asyncHandler } from "../error/errorHandler.js";
import { appError } from "../error/classError.js";
import accountModel from "../DB/models/account.js";
import transactionModel from "../DB/models/transaction.js";
import { ApiFeatures } from "../service/ApiFeatures.js";

export const createAccount = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const exists = await accountModel.findOne({ userID: _id });
  if (exists) next(new appError("you already have an account", 400));
  const account = await accountModel.create({ userID: _id });

  res.status(200).json({ msg: "done", account });
});

export const deposite = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { money } = req.body;
  let account = await accountModel.findOne({ userID: _id });
  if (!account) next(new appError("can't find your account", 404));
  if (money <= 0)
    next(new appError("can't deposite amount less or equal than zero", 400));
  account.money += money;
  await account.save();
  await transactionModel.create({
    accountID: account._id,
    transactionType: "deposite",
    amount: money,
  });

  res.status(200).json({ msg: "done", account });
});

export const withdraw = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { money } = req.body;
  let account = await accountModel.findOne({ userID: _id });
  if (!account) next(new appError("can't find your account", 404));
  if (money > account.money)
    next(new appError("can't withdraw amount more than your balance", 400));
  account.money -= money;
  await account.save();
  await transactionModel.create({
    accountID: account._id,
    transactionType: "withdraw",
    amount: money,
  });

  res.status(200).json({ msg: "done", account });
});

export const balanceInquiry = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const account = await accountModel.findOne({ userID: _id });
  if (!account) next(new appError("can't find your account", 404));

  res.status(200).json({ msg: "done", Balance: account.money });
});

export const transactions = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const account = await accountModel.findOne({ userID: _id });
  if (!account) next(new appError("can't find your account", 404));
  const apiFeatures = new ApiFeatures(
    transactionModel.find({ accountID: account._id }),
    req.query
  )
    .pagination()
    .sort(createdAt);

  const transactions = await apiFeatures.query;

  res.status(200).json({ msg: "done", transactions });
});

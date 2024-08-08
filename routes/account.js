import express from 'express';
import * as AC from '../controllers/account.js';
import {validation} from '../middleware/validation.js';
import * as AV from '../validations/account.js';
import {auth} from '../middleware/auth.js';

const router = express.Router()

router.route("/").post(validation(AV.createAccount), auth(), AC.createAccount)
router.route("/deposite").post(validation(AV.deposite), auth(), AC.deposite)
router.route("/withdraw").post(validation(AV.withdraw), auth(), AC.withdraw)
router.route("/balance").get(validation(AV.balanceInquiry), auth(), AC.balanceInquiry)
router.route("/transactions").get(validation(AV.transactions), auth(), AC.transactions)

export default router
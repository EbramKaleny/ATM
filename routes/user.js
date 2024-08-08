import express from 'express';
import * as UC from '../controllers/user.js';
import {validation} from '../middleware/validation.js';
import * as UV from '../validations/user.js';

const router = express.Router()

router.route("/register").post(validation(UV.register),UC.register)
router.route("/logIn").post(validation(UV.logIn),UC.logIn)

export default router
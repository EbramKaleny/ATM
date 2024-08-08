import joi from 'joi';
import { generalValidation } from './generalValidation.js';

export const createAccount = {
    headers: generalValidation.headers.required()
}

export const balanceInquiry = {
    headers: generalValidation.headers.required()
}

export const transactions = {
    headers: generalValidation.headers.required(),
    query: joi.object({
        page: joi.number().integer().positive()
    })
}

export const deposite = {
    body: joi.object({
        money: joi.number().integer().positive().required()
    }).required(),
    headers: generalValidation.headers.required()
}

export const withdraw = {
    body: joi.object({
        money: joi.number().integer().positive().required()
    }).required(),
    headers: generalValidation.headers.required()
}
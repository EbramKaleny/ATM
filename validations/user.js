import joi from "joi";

export const register = {
  body: joi
    .object({
      name: joi.string().min(3).max(15).required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
        .required(),
    })
    .required(),
};

export const logIn = {
  body: joi
    .object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .required(),
    })
    .required(),
};
